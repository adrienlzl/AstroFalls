"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Meteorite} from "@/lib/interfaces/meteorite-interface";

export const columns: ColumnDef<Meteorite>[] = [
    {
        accessorKey: "achondrite",
        header: "Nom",
    },
    {
        accessorKey: "Class",
        header: "classe",
    },
    {
        accessorKey: "Country",
        header: "pays",
    },
    {
        accessorKey: "Locality",
        header: "localité",
    },
    {
        accessorKey: "ff",
        header: "chute",
    },
    {
        accessorKey: "Group",
        header: "groupe",
    },
    {
        accessorKey: "Year",
        header: "Année",
    },
    {
        accessorKey: "Name",
        header: "nom",
    },
    {
        accessorKey: "wg",
        header: "masse",
    },
]
