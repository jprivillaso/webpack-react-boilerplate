import moment from 'moment';

export default class StringUtils {

  static formatText(name) {

    const time = moment().format('hh:mm:ss');
    return `Hi ${name}! You arrived at Time: ${time}`;

  }

}
