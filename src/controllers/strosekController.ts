import {Request, Response} from 'express';

import {Strosek} from '../models/strosek.model';

export const getStroski = async (req: Request, res: Response) => {
    try {
		const stroski = await Strosek.find();
		res.status(200).json(stroski);
	} catch (err) {
		res.status(500).json({
			message: 'Error when getting stroski.',
			error: err,
		});
	}
};

export const addStrosek = async (req: Request, res: Response) => {
    try{
        const strosek = new Strosek({
            naziv: req.body.naziv,
            znesek: req.body.znesek,
            datum: req.body.datum,
            kategorija: req.body.kategorija,
            zaposleni: req.body.zaposleni
        });
        await strosek.save();
        res.status(201).json(strosek);
	} catch (err) {
		res.status(500).json({
			message: 'Error creating strosek',
			error: err,
    })};
};

export const deleteStrosek = async (req: Request, res: Response) => {
    try{
        const strosekId = req.params.id;
        await Strosek.findByIdAndDelete({_id: strosekId});
        res.status(204).json({
			msg: `Strosek with ID ${strosekId} has been deleted.`,
		});
    }
    catch (err) {
		res.status(500).json({
			message: 'Error deleting strosek',
			error: err,
    })};
}