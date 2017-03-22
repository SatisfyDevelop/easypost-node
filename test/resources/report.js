import report from '../../src/resources/report';
import NotImplementedError from '../../src/errors/notImplemented';
import apiStub from '../helpers/apiStub';

describe('Report Base Resource', () => {
  it('exists', () => {
    expect(report).to.not.be.undefined;
    expect(report).to.be.a('function');
  });

  it('calls retrieve using the type that is passed', () => {
    const stub = apiStub();
    const Report = report(stub);

    Report.retrieve('shipment', 'id_123').then(() => {
      expect(stub.get).to.have.been.calledOnce;
      expect(stub.get).to.have.been.calledWith('reports/shipment/id_123');
    });
  });

  it('calls all using the type that is passed', () => {
    const stub = apiStub();
    const Report = report(stub);

    Report.all('shipment').then(() => {
      expect(stub.get).to.have.been.calledOnce;
      expect(stub.get).to.have.been.calledWith('reports/shipment');
    });
  });

  describe('toJSON', () => {
    let ReportBase;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      ReportBase = report(stub);
    });

    it('wrapJSON returns the json', () => {
      const json = { foo: 'bar' };
      expect(ReportBase.wrapJSON(json)).to.deep.equal(json);
    });
  });

  it('unwraps array responses', () => {
    const Report = report(apiStub());
    const data = [new Report()];
    expect(Report.unwrapAll({ reports: data })).to.deep.equal(data);
  });

  it('throws on delete', () => {
    const Report = report(apiStub());
    Report.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
