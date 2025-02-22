'use server'

import { CollectionName } from '@/lib/collection.enum';
import { connectToDatabase } from '@/lib/mongodb';
import { Meteorite } from "@/lib/interfaces/meteorite-interface";


export async function getAllMeteorite(): Promise<Meteorite[]> {
	try {
		console.time("⏳ Récupération des météorites");
		const db = await connectToDatabase();

		console.time("⏳ Exécution de la requête MongoDB");
		const MeteoriteDatas: Meteorite[] = await db.collection<Meteorite>(CollectionName.METEORITE_FRONT)
			.find({})
			.limit(50)
			.toArray();
		console.timeEnd("⏳ Exécution de la requête MongoDB");

		const result =  MeteoriteDatas.map((MeteoriteData) => ({
			...MeteoriteData,
			_id: MeteoriteData?._id?.toString()
		}));

		console.timeEnd("⏳ Récupération des météorites");
		return result;
	}

	catch (error) {
		throw error;
	}
}
