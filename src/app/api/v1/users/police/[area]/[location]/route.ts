import prisma from "@/prisma";
import { Prisma, Zone } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { area: "zone" | "city" | "state"; location: any } }
) => {
  try {
    const { area, location } = params;
    const officers = await prisma.policeOfficer.findMany({
      where: {
        assignedStation: {
          location: {
            OR: [{ city: location }, { state: location }],
          },
        },
      },
      include: {
        user: true
      }
    });
    return NextResponse.json({ message: "Fetched!", officers })
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: "Server Error", error: error });
  }
};
