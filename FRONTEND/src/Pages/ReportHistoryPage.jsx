import React, { useEffect, memo } from "react";
import Report from "../Components/ReportHistoryPage/Report";
import { useDispatch, useSelector } from "react-redux";
import { getAllReports } from "../Store/Actions/reportHistorySlice";

function ReportHistoryPage() {
  const state = useSelector((state) => state.reportHistorySlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReports());
  }, []);

  return (
    <div className=" flex flex-col gap-5">
      {state.map((report) => (
        <Report
          key={report.id}
          createdAt={report.createdAt}
          url={report.url}
          email={report.userEmail}
        />
      ))}
    </div>
  );
}

export default memo(ReportHistoryPage);
