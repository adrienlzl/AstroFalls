"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Meteorite} from "@/lib/interfaces/meteorite-interface";

export const columns: ColumnDef<Meteorite>[] = [
	{
		accessorKey: "Name",
		header: "Nom",
	},
	{
		accessorKey: "Year",
		header: "Année",
	},
	{
		accessorKey: "wg",
		header: "Masse",
	},
	{
		accessorKey: "Country",
		header: "Pays",
	},
	{
		accessorKey: "Locality",
		header: "Lieu",
	},
	{
		accessorKey: "ff",
		header: "Découverte",
	},
	{
		accessorKey: "Class",
		header: "Classe",
	},
	{
		accessorKey: "Group",
		header: "Groupe",
	}
]
