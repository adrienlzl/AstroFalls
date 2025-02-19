"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Meteorite } from "@/lib/interfaces/meteorite-interface";

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
		cell: ({ row }) => {
			const value = row.getValue("ff") as string | undefined;
			if (!value) return "NC";

			const lowerCaseValue = value.toLowerCase();
			if (lowerCaseValue === "find") return "Oui";
			if (lowerCaseValue === "fall") return "Non";
			return "NC";
		}
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
