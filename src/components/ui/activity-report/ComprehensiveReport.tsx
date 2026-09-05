import { useState } from 'react';
import CustomWrapper from '../../shared/Wrapper';
import Radio from '../../shared/Radio';

function ComprehensiveReport() {
  const [reportType, setReportType] = useState('comprehensive');

  return (
    <CustomWrapper
      className="min-w-full rounded-md min-h-125 py-5 px-6"
      showMessage={false}
      showExcel={true}
      showSearch={true}
    >
      <div className="mt-5">
        <Radio
          label="Comprehensive Report"
          name="reportType"
          value="comprehensive"
          checked={reportType === 'comprehensive'}
          onChange={(e) => setReportType(e.target.value)}
        />
      </div>
    </CustomWrapper>
  );
}

export default ComprehensiveReport;
