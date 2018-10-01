import go from 'gojs'

import util from './common'

// Cached dataset
let crewList = []
let crewFirstModelMap = {}

function WheelLayout() {
  go.CircularLayout.call(this);
}

go.Diagram.inherit(WheelLayout, go.CircularLayout);

// override makeNetwork to set the diameter of each node and ignore the TextBlock label
/** @override */
WheelLayout.prototype.makeNetwork = function(coll) {
  var net = go.CircularLayout.prototype.makeNetwork.call(this, coll);
  net.vertexes.each(function(cv) {
    cv.diameter = 20;  // because our desiredSize for nodes is (20, 20)
  });
  return net;
}

// override commitNodes to rotate nodes so the text goes away from the center,
// and flip text if it would be upside-down
/** @override */
WheelLayout.prototype.commitNodes = function() {
  go.CircularLayout.prototype.commitNodes.call(this);
  this.network.vertexes.each(function(v) {
    var node = v.node;
    if (node === null) return;
    // get the angle of the node towards the center, and rotate it accordingly
    var a = v.actualAngle;
    if (a > 90 && a < 270) {  // make sure the text isn't upside down
      var textBlock = node.findObject("TEXTBLOCK");
      textBlock.angle = 180;
    }
    node.angle = a;
  });
};

// override commitLinks in order to make sure all of the Bezier links are "inside" the ellipse;
// this helps avoid links crossing over any other nodes
WheelLayout.prototype.commitLinks = function() {
  go.CircularLayout.prototype.commitLinks.call(this);
  if (this.network.vertexes.count > 4) {
    this.network.vertexes.each(function(v) {
      v.destinationEdges.each(function(de) {
        var dv = de.toVertex;
        var da = dv.actualAngle;
        var sa = v.actualAngle;
        if (da - sa > 180) da -= 360;
        else if (sa - da > 180) sa -= 360;
        de.link.curviness = (sa > da) ? 15 : -15;
      })
    })
  }
}
// end WheelLayout class

// TODO: NEED TO BE FIXED!
var highlightColor = "red";  // color parameterization

function manipulateData (modelList) {
  crewList = modelList.reduce((resultArray, model) => {
    // Faction - crew map
    if (crewFirstModelMap[model.faction] === undefined
        || crewFirstModelMap[model.faction] > model.name) {
      crewFirstModelMap[model.faction] = model.name
    }

    // Crew list
    while (resultArray[model.crewIndex] === undefined) {
      resultArray.push([])
    }
  
    resultArray[model.crewIndex].push(model)
    return resultArray
  }, [])
}

function initializeGraphObject(domId, modelList) {
  var $ = go.GraphObject.make;  // for conciseness in defining templates

  let graphObject =
    $(go.Diagram, domId, // must be the ID or reference to div
      {
        initialAutoScale: go.Diagram.Uniform,
        padding: 10,
        contentAlignment: go.Spot.Center,
        layout:
          $(WheelLayout,  // set up a custom CircularLayout
            // set some properties appropriate for this sample
            {
              arrangement: go.CircularLayout.ConstantDistance,
              nodeDiameterFormula: go.CircularLayout.Circular,
              spacing: 10,
              aspectRatio: 0.7,
              sorting: go.CircularLayout.Forwards
            }),
        isReadOnly: true,
        click: function(e) {  // background click clears any remaining highlighteds
          e.diagram.startTransaction("clear");
          e.diagram.clearHighlighteds();
          e.diagram.commitTransaction("clear");
        }
      });

  // define the Node template
  graphObject.nodeTemplate =
    $(go.Node, "Horizontal",
      {
        selectionAdorned: false,
        locationSpot: go.Spot.Center,  // Node.location is the center of the Shape
        locationObjectName: "SHAPE",
        mouseEnter: function(e, node) {
          node.diagram.clearHighlighteds();
          node.linksConnected.each(function(l) { highlightLink(l, true); });
          node.isHighlighted = true;
          var tb = node.findObject("TEXTBLOCK");
          if (tb !== null) tb.stroke = node.data.color;
        },
        mouseLeave: function(e, node) {
          node.diagram.clearHighlighteds();
          var tb = node.findObject("TEXTBLOCK");
          if (tb !== null) tb.stroke = "black";
        }
      },
      // new go.Binding("text", "text"),  // for sorting the nodes
      $(go.Shape, "Ellipse",
        {
          name: "SHAPE",
          fill: "lightgray",  // default value, but also data-bound
          stroke: "transparent",  // modified by highlighting
          strokeWidth: 2,
          desiredSize: new go.Size(20, 20),
          portId: ""
        },  // so links will go to the shape, not the whole node
        new go.Binding("fill", "color"),
        new go.Binding("stroke", "isHighlighted",
                       function(h) { return h ? highlightColor : "transparent"; })
                      .ofObject()),
      $(go.TextBlock,
        { name: "TEXTBLOCK" },  // for search
        new go.Binding("text", "text"))
    );

  function highlightLink(link, show) {
    link.isHighlighted = show;
    link.fromNode.isHighlighted = show;
    link.toNode.isHighlighted = show;
  }

  // define the Link template
  graphObject.linkTemplate =
    $(go.Link,
      {
        routing: go.Link.Normal,
        curve: go.Link.Bezier,
        selectionAdorned: false,
        mouseEnter: function(e, link) { highlightLink(link, true); },
        mouseLeave: function(e, link) { highlightLink(link, false); }
      },
      $(go.Shape,
        new go.Binding("stroke", "isHighlighted",
                       function(h, shape) { return h ? highlightColor : shape.part.data.color; })
                      .ofObject(),
        new go.Binding("strokeWidth", "isHighlighted",
                       function(h) { return h ? 2 : 1; })
                      .ofObject())
      // no arrowhead -- assume directionality of relationship need not be shown
    );
  
  // Bind dataset to local variable
  manipulateData(modelList)
  return graphObject
}

function drawGraph(graphObject, targetFaction, targetModel) {
  const globalColor = util.getFactionColor(targetFaction)

  // If there's no target model, pick faction's first model
  if (targetModel === undefined) {
    targetModel = crewFirstModelMap[targetFaction]
  }

  // Temporal objects for optimize
  let modelSet = new Set()
  let modelKeyMap = new Object()

  let nodeDataArray = crewList
    // Filter by crew's faction
    .filter(crew => crew[0].faction === targetFaction)
    // Extract unique model elements
    .reduce((array, crew) => {
      // Check crew having target model
      let hasTargetModel = crew.some(model => model.name === targetModel)

      crew.forEach(model => {
        if (!modelSet.has(model.name)) {
          array.push({
            name: model.name,
            faction: model.faction
          })
        }

        // Optimize
        modelSet.add(model.name)

        if (hasTargetModel) {
          modelKeyMap[model.name] = -1
        }
      })

      return array
    }, [])
    // Sort by name, except target model
    .sort((prev, next) => {
      return prev.name > next.name ? 1 : -1
    })
    // Form elements to fit node data array
    .map((model, index) => {
      if (modelKeyMap[model.name] !== undefined) {
        modelKeyMap[model.name] = index
      }
      
      return {
        key: index,
        text: model.name,
        color: globalColor
      }
    })

  let linkDataArray = Object.keys(modelKeyMap)
    .filter(name => name !== targetModel)
    .map(name => {
      return {
        from: modelKeyMap[targetModel],
        to: modelKeyMap[name],
        color: globalColor
      }
    })

  // Bind model node click event
  graphObject.nodeTemplate.click = function (event, node) { drawGraph(graphObject, targetFaction, node.data.text) }
  graphObject.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
}

export default {
  initializeGraphObject,
  drawGraph
}