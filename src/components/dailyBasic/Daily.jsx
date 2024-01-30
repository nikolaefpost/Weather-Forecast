
import PropTypes from "prop-types";
import DailyBasicShort from "./DailyBasicShort.jsx";
import DailyBasic from "./DailyBasic.jsx";

const Daily = ({blockHeight, dailyData, loading, error}) => {
    const isShort = blockHeight>350

    return  isShort? <DailyBasicShort {...dailyData} loading={loading} /> : <DailyBasic {...dailyData} loading={loading} error={error}/>
};

Daily.propTypes = {
    blockHeight: PropTypes.number.isRequired,
    dailyData: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default Daily;