
const schemas = require("../../mongodb/schemas/schemas");

const getTotalLeaveCount = async (req, res) => {
    const { financialYear, month, quarter, firstQuarterMonth } = req.body; 
    let query = {}; 
    if (financialYear) {
        const year = parseInt(financialYear, 10);
        const firstQMonth = parseInt(firstQuarterMonth || '4', 10) - 1;

        if (!isNaN(year) && firstQMonth >= 0 && firstQMonth <= 11) {
            let startDate, endDate;


        try {
            if (month) {
                const monthInt = parseInt(month, 10) - 1; 
                if (monthInt < 0 || monthInt > 11) {
                    return res.status(400).json({ message: 'Invalid month provided.' });
                }
                startDate = new Date(year, monthInt, 1);
                endDate = new Date(year, monthInt + 1, 0);
            } else if (quarter) {
                const quarterInt = parseInt(quarter, 10);
                if (quarterInt < 1 || quarterInt > 4) {
                    return res.status(400).json({ message: 'Invalid quarter provided.' });
                }
                const startMonth = (firstQMonth + (quarterInt - 1) * 3) % 12;
                const startYear = year + Math.floor((firstQMonth + (quarterInt - 1) * 3) / 12);
                startDate = new Date(startYear, startMonth, 1);
                const endMonth = (startMonth + 3) % 12;
                const endYear = startMonth + 3 > 11 ? startYear + 1 : startYear;
                endDate = new Date(endYear, endMonth, 0);
            } else {
                startDate = new Date(year, firstQMonth, 1);
                const endMonth = (firstQMonth + 12) % 12;
                const endYear = firstQMonth + 12 > 11 ? year + 1 : year;
                endDate = new Date(endYear, endMonth, 0);
            }
            query.createdAt = { $gte: startDate, $lte: endDate };
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    } else {
        return res.status(400).json({ message: 'Invalid financial year or first quarter month.' });
    }
}

try {
        const totalLeaveCount = await schemas.LeaveRequest.countDocuments(query);
        res.json({ totalLeaveCount });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = getTotalLeaveCount;





