import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        // console.log(body)
        const { stationName, stationMail, stationPhone, location, SHO, officers } = body
        const station = await prisma.policeStation.create({
            data: {
                location: {
                    ...location
                },
                SHO: {
                    create: {
                        ...SHO
                    }
                },
                officers: {
                    create: officers
                },
                stationName,
                stationMail,
                stationPhone
            }
        })
        return NextResponse.json({ message: "Done", station }, {status:201})
    } catch (err) {
        console.log(err)
        return NextResponse.json({}, {status: 500})
    }
}