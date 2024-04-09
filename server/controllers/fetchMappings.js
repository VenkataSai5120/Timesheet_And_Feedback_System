const Mapping = require('../models/Mapping.js');

const getAllMappings = async (req, res) => {
    try {
        const mappings = await Mapping.find({});
        const mappingData = [];
        
        mappings.forEach(project => {
            const { role, employees } = project.toObject();
            mappingData.push({ role, employees });
        });

        console.log(mappingData);

        res.status(200).json(mappingData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getAllMappings };