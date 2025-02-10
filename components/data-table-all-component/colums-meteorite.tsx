"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Meteorite} from "@/lib/interfaces/meteorite-interface";

export const columns: ColumnDef<Meteorite>[] = [
    {
        accessorKey: "Name",
        header: "Nom",
    },
    {
        accessorKey: "Class",
        header: "Classe",
    },
    {
        accessorKey: "Country",
        header: "Pays",
    },
    {
        accessorKey: "Locality",
        header: "Localité",
    },
    {
        accessorKey: "wg",
        header: "Masse",
    },
    {
        accessorKey: "Year",
        header: "Année",
    },
    {
        accessorKey: "ff",
        header: "Chute",
    },
    {
        accessorKey: "Group",
        header: "Groupe",
    }
]
