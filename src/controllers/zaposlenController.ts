import { Request, Response } from 'express';

import { Zaposleni } from '../models/zaposlen.model';

export const getZaposleni = async (req: Request, res: Response) => {
    try {
        const stroski = await Zaposleni.find();
        res.status(200).json(stroski);
    } catch (err) {
        res.status(500).json({
            message: 'Error when getting stroski.',
            error: err,
        });
    }
};

export const addZaposleni = async (req: Request, res: Response) => {
    try {
        const strosek = new Zaposleni({
            ime: req.body.ime,
            priimek: req.body.priimek,
            vloga: req.body.vloga,
            email: req.body.email
        });
        await strosek.save();
        res.status(201).json(strosek);
    } catch (err) {
        res.status(500).json({
            message: 'Error creating strosek',
            error: err,
        })
    };
};

export const deleteZaposleni = async (req: Request, res: Response) => {
    try {
        const zaposleniId = req.params.id;
        await Zaposleni.findByIdAndDelete({ _id: zaposleniId });
        res.status(204).json({
            msg: `Strosek with ID ${zaposleniId} has been deleted.`,
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Error deleting zaposleni',
            error: err,
        })
    };
}