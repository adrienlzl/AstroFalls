'use server'


import {connectToDatabase} from '@/lib/mongodb';
import {CollectionName} from "@/lib/collection.enum";
import {meteorite} from "@/lib/interfaces/meteorite-interface";


export async function getAllMeteoriteData(): Promise<meteorite[]> {
    try {
        const db = await connectToDatabase();

        const meteoriteData: meteorite[] = await db.collection<meteorite>(CollectionName.METEORITE).find({}).toArray();

        return meteoriteData.map((data : meteorite) => ({
            ...data,
            _id: data?._id?.toString(), // Convertir ObjectId en chaîne de caractères
        }));
    } catch (error) {
        throw error;
    }
}


