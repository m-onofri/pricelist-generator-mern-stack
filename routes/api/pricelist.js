const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const PriceList = require('../../models/Pricelist');
const auth = require('../../middlewares/auth.js');

//@route GET api/pricelist/
//@desc Get all the Pricelist of a user
//@access Private
router.get('/', auth, async (req, res) => {
    try {
        const data = await PriceList.find({user: req.user.id});
        const listino = data.reduce((obj, item) => {
            obj[item.name] = item.periods.reduce((obj1, period) => {
                obj1[period.periodName] = period;
                return obj1;
            }, {});
            return obj;
    }, {});
    res.send(listino);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route POST api/pricelist/
//@desc Create a new pricelist
//@access Private
router.post('/', [auth, [
    check('priceList.*[1].name', 'Name is required').not().isEmpty(),
    check('priceList.*[1].periodName', 'Period is required').not().isEmpty(),
    check('priceList.*[1].start', 'Start date is required').not().isEmpty(),
    check('priceList.*[1].end', 'End date is required').not().isEmpty(),
    check('priceList.*[1].ad', 'Adult price is required').not().isEmpty(),
    check('priceList.*[1].ad34', 'Price of adult in third/forh bed is required').not().isEmpty(),
    check('priceList.*[1].chd3', 'Price of child in third bed is required').not().isEmpty(),
    check('priceList.*[1].chd4', 'Price of child in forth bed is required').not().isEmpty(),
    check('priceList.*[1].inf', 'Price of infant is required').not().isEmpty(),
    check('priceList.*[1].culla', 'Price of culla is required').not().isEmpty(),
    check('priceList.*[1].animal', 'Price of animal is required').not().isEmpty(),
    check('priceList.*[1].sing', 'Price of single room is required').not().isEmpty(),
    ]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        //const arr = JSON.parse(req.body.priceList);
        const arr = req.body.priceList;
        const name = arr[0][1].name;
        const pricelists = await PriceList.find({user: req.user.id});
        const namesArray = pricelists.map(p => p.name);
        if (namesArray.includes(name)) {
            return res.send({
                success: false,
                message: 'Error: pricelist name must be unique.'
            });
        }

        const periods = arr.map(p => {
            return ({
                periodName: p[1].periodName,
                start: new Date(p[1].start.split("-")),
                end: new Date(p[1].end.split("-")),
                prices: {
                    ad: parseFloat(p[1].ad),
                    ad34: parseFloat(p[1].ad34),
                    chd3: parseFloat(p[1].chd3),
                    chd4: parseFloat(p[1].chd4),
                    inf: parseFloat(p[1].inf),
                    culla: parseFloat(p[1].culla),
                    animal: parseFloat(p[1].animal),
                    sing: parseFloat(p[1].sing)
                }
            });
        });
        
        const periodsNames = periods.map(p => p.periodName);
        const periodsNamesSet = new Set(periodsNames);
        if (periodsNames.length !== periodsNamesSet.size) {
            return res.send({
                success: false,
                message: 'Error: periods names must be unique.'
            });
        }
        for (let period of periods) {
            if (period.start.getTime() >= period.end.getTime()) {
                return res.send({
                    success: false,
                    message: 'Error: arrival date must be previous than departure date.'
                });
            }
        }
        if (periods.length > 1) {
            const newPeriods = [...periods];
            newPeriods.sort((a, b) => a.start.getTime() - b.start.getTime());
            for (let i = 0; i < (newPeriods.length - 1); i++) {
                if (newPeriods[i].end.getTime() > newPeriods[i + 1].start.getTime()) {
                    return res.send({
                        success: false,
                        message: 'Error: date ranges cannot overlap.'
                    });
                }
            }
        }

        const pricelist = new PriceList({
            user: req.user.id,
            name,
            periods
        });
        await pricelist.save();    
        console.log("New pricelist created!");

        return res.send({
            success: true,
            message: 'Pricelist saved!'
        });
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route POST api/pricelist/update/:pricelist_id
//@desc Update pricelist name
//@access Private
router.post('/update/:pricelist_id', [auth, [
    check('name', 'Name is required').not().isEmpty()
    ]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const newName = req.body.name;
        const pricelists = await PriceList.find({user: req.user.id});
        const namesArray = pricelists.map(p => p.name);
        if (namesArray.includes(newName)) {
            return res.send({
                success: false,
                message: 'Error: pricelist name must be unique.'
            });
        }
        await PriceList.update({_id: req.params.pricelist_id},{$set:{
            name: newName.toUpperCase()}
        },{multi:true,new:true});
        console.log("Pricelist name changed!");
        return res.send({
            success: true,
            message: 'Pricelist name changed!'
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route POST api/pricelist/delete/:pricelist_id
//@desc Delete a pricelist
//@access Private
router.post('/delete/:pricelist_id', auth, async (req, res) => {
    try {
        await PriceList.findOneAndRemove({_id: req.params.pricelist_id});
        console.log("Price List Deleted");
        //res.redirect("http://localhost:3000/admin");
        res.send('Pricelist deleted');
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route POST api/pricelist/:pricelist_id/period/add
//@desc Add a new period to a pricelist
//@access Private
router.post('/:pricelist_id/period/add', [auth, [
    check('periodName', 'Period name is required').not().isEmpty(),
    check('start', 'Start date is required').not().isEmpty(),
    check('end', 'End date is required').not().isEmpty(),
    check('ad', 'Adult price is required').not().isEmpty(),
    check('ad34', 'Price of adult in third/forh bed is required').not().isEmpty(),
    check('chd3', 'Price of child in third bed is required').not().isEmpty(),
    check('chd4', 'Price of child in forth bed is required').not().isEmpty(),
    check('inf', 'Price of infant is required').not().isEmpty(),
    check('culla', 'Price of culla is required').not().isEmpty(),
    check('animal', 'Price of animal is required').not().isEmpty(),
    check('sing', 'Price of single room is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        //const priceList = JSON.parse(req.body.priceList);
        const periodData = {
            periodName: req.body.periodName,
            start: new Date(req.body.start),
            end: new Date(req.body.end),
            prices: {
                ad: req.body.ad,
                ad34: req.body.ad34,
                chd3: req.body.chd3,
                chd4: req.body.chd4,
                inf: req.body.inf,
                culla: req.body.culla,
                animal: req.body.animal,
                sing: req.body.sing,
            }
        }
        const data = await PriceList.findOne({_id: req.params.pricelist_id});
        
        if (req.body.period_id) {
            data.periods = data.periods.filter(p => p._id.toString !== req.body.period_id);
        }
        
        const periods = [...data.periods, periodData];
        const periodsNames = periods.map(p => p.periodName);
        const periodsNamesSet = new Set(periodsNames);
        if (periodsNames.length !== periodsNamesSet.size) {
            return res.send({
                success: false,
                message: 'Error: periods names must be unique.'
            });
        }
        for (let period of periods) {
            if (period.start.getTime() >= period.end.getTime()) {
                return res.send({
                    success: false,
                    message: 'Error: arrival date must be previous than departure date.'
                });
            }
        }
        if (periods.length > 1) {
            const newPeriods = [...periods];
            newPeriods.sort((a, b) => a.start.getTime() - b.start.getTime());
            for (let i = 0; i < (newPeriods.length - 1); i++) {
                if (newPeriods[i].end.getTime() > newPeriods[i + 1].start.getTime()) {
                    return res.send({
                        success: false,
                        message: 'Error: date ranges cannot overlap.'
                    });
                }
            }
        }
            
        await PriceList.updateOne(
            {_id: req.params.pricelist_id},
            {$set:{periods: periods}},
            {multi:true,new:true});
        console.log("New period added");
        return res.send({
            success: true,
            message: 'New period added'
        });
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error'); 
    }
});

//@route POST api/pricelist/:pricelist_id/period/delete/:period_id
//@desc Delete a period in a pricelist
//@access Private
router.post('/:pricelist_id/period/delete/:period_id', auth, async (req, res) => {
    try {
        const pricelist = await PriceList.findOne({_id: req.params.pricelist_id});
        const periods = pricelist.periods.filter(p => p._id.toString() !== req.params.period_id);
        pricelist.periods = periods;
        await pricelist.save();
        console.log("Period deleted");
        //res.redirect("http://localhost:3000/admin");
        res.send('Period deleted');
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
 
module.exports = router;