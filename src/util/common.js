export default {

  getFactionColor: function (faction) {
    switch (faction) {
      case 'Guild':             return '#EB1010';
      case 'Arcanists':         return '#197EE3';
      case 'Resurrectionists':  return '#529410';
      case 'Neverborn':         return '#A614A6';
      case 'TenThunders':       return '#F5881B';
      case 'Gremlins':          return '#82650E';
      case 'Outcasts':          return '#E8CC76';
    }
  }

}