import { getOandaPrices } from '../../fetchOandaData';

export default async function handler(req, res) {
  try {
    const data = await getOandaPrices();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
