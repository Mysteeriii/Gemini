import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email } = req.body;
        const { data, error } = await supabase
            .from('ilmoittautumiset')
            .insert([{ name, email }]);
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ message: 'Ilmoittautuminen onnistui!' });
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
