import T from 'proptypes';
import base from './base';

export default api => (
  class Report extends base(api) {
    static get url() {
      return `reports/${this.type}`;
    }

    static propTypes = {
      id: T.string,
      object: T.string,
      type: T.string,
      mode: T.string,
      status: T.string,
      start_date: T.string,
      end_date: T.string,
      include_children: T.bool,
      url: T.string,
      url_expires_at: T.object,
      send_email: T.bool,
      created_at: T.object,
      updated_at: T.object,
    }

    constructor(data = {}) {
      super(data);
      this.constructor.type = data.type;
    }

    static async retrieve(type, id) {
      return super.retrieve(id, `reports/${type}`);
    }

    static async all(type, query = {}) {
      return super.all(query, `reports/${type}`);
    }

    static wrapJSON(json) {
      return json;
    }

    static unwrapAll(data) {
      return data.reports;
    }

    static delete() {
      return this.notImplemented('delete');
    }
  }
);
