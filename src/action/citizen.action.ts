'use server'

import { auth, UserPayload, verifyAuth } from "@/auth";
import prisma from "@/prisma";
import { User, UserWithImage } from "@/types/user.types";
import { LicenseType } from "@prisma/client";
import { cookies } from "next/headers";

export async function getUser() {
  try {
    const decodedToken: UserPayload | null = await verifyAuth(cookies().get("accessToken")?.value!)
    return decodedToken
  } catch (err) {
    console.log(err)
    return null
  }
}

export const getCurrentUser = async () => {
  try {
    const session: UserPayload | null = await verifyAuth(cookies().get("accessToken")?.value!)
    if (!session) return null

    const currentUser: UserWithImage = await prisma.user.findUnique({
      where: {
        id: session.id,
        role: "Citizen",
      },
      include: {
        profilePhoto: true,
        userDocuments: true,
        address: true
      }
    })

    if (!currentUser) return null

    return currentUser
  }
  catch (err) {
    console.error(err)
  }
}


export const logoutUser = async () => {
  try {
    cookies().delete("accessToken")
    return true
  } catch (err) {
    return err
  }
}

export const findNearestPoliceStation = async (pincode: string) => {
  try {

      for (let i = 0; i <= 5; i++) {
        const postalCodePlus = (Number(pincode) + i).toString()
        const postalCodeMinus = (Number(pincode) - i).toString()
        const station = await prisma.policeStation.findFirst({
          where: {
            location: {
              OR: [
                {
                  postalCode: postalCodePlus
                },
                {
                  postalCode: postalCodeMinus
                }
              ]
            }
          },
          select: {
            id: true
          }
        })
        if(station) return station
      }

    return null


  } catch (err) {
    console.log(err)
    return null
  }
}


export const submitLicenseApplication = async ({ assignedStationId, licenseType, reason, userId }: { assignedStationId: string, licenseType: LicenseType, reason: string, userId: string }) => {
  try {
    await prisma.licenseApplication.create({
      data: {
        user: {
          connect: {
            id: userId
          }
        },
        type: licenseType,
        reason,
        assignedStation: {
          connect: {
            id: assignedStationId
          }
        }
      }
    })
    return true
  } catch (error) {
    console.log(error)
    return null
  }
}