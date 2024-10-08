import fs from 'fs';
import csv from 'csv-parser';
import prisma from '@/prisma';


async function seedPoliceStations() {
  const results: any[] = [];

  fs.createReadStream('/home/vishal/Downloads/Police_Station_0_0.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      for (const station of results) {
        // convert to lower case
        station.state = station.state.toLowerCase();
        station.city = station.city.toLowerCase();
        station.district = station.district.toLowerCase();
        station.address = station.address.toLowerCase();
        station.stationName = station.stationName.toLowerCase();
        station.stationPhone = station.stationPhone.replace(/\D/g, '');
        if (station.stationPhone.startsWith('0')) {
          station.stationPhone = station.stationPhone.slice(1);
        }

        const addressWithStation = await prisma.address.create({
          data: {
            zone: "East",
            state: station.state,
            city: station.city,
            district: station.district,
            postalCode: station.postalCode,
            address: station.address,
            policeStation: {
              create: {
                stationName: station.stationName,
                stationPhone: station.stationPhone,
              },
          },
        }});
        console.log(addressWithStation);
      }

      console.log('Police stations seeded successfully!');
    });
}

interface AddressInfo {
  village: string;
  post_office: string;
  police_station: string;
  district: string;
  pin_code: string;
}

function extractAddressInfo(address: string): AddressInfo | null {
  // Normalize the address by removing line breaks and excess spaces
  const normalizedAddress = address.replace(/\s*\n\s*/g, ' ').trim();

  // Updated regex pattern
  const pattern = /(VILL|TOWN)\s*-\s*([A-Za-z\s]+),?\s*PO\s*-\s*([A-Za-z\s]+),?\s*PS\s*-\s*([A-Za-z\s]+),?\s*DIST\s*-\s*([A-Za-z\s]+),?\s*PIN\s*-\s*(\d{6})/;
  const match = normalizedAddress.match(pattern);

  if (match) {
    const [, , village, post_office, police_station, district, pin_code] = match;
    return {
      village: village.trim(),
      post_office: post_office.trim(),
      police_station: police_station.trim(),
      district: district.trim(),
      pin_code: pin_code.trim(),
    };
  }

  return null;
}

async function seedPoliceOfficers() {
  const results: any[] = [];

  fs.createReadStream('/home/vishal/Downloads/ Police_Officers.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      for (const officer of results) {
        try {
          // Extract permanent address
          const permanentAddress = officer['PERMANENT ADDRESS'];
          const presentAddress = officer['PRESENT ADDRESS'];

          if (!permanentAddress) {
            console.warn(`Permanent address is missing for officer ${officer.fullName}`);
            continue;
          }

          if (!presentAddress) {
            console.warn(`Present address is missing for officer ${officer.fullName}`);
            continue;
          }

          // Extract permanent address
          const permanentAddressInfo = extractAddressInfo(permanentAddress);
          if (!permanentAddressInfo) {
            console.warn(`Invalid permanent address format for officer ${officer.fullName}`);
            continue;
          }

          // Extract present address
          const presentAddressInfo = extractAddressInfo(presentAddress);
          if (!presentAddressInfo) {
            console.warn(`Invalid present address format for officer ${officer.fullName}`);
            continue;
          }


          // Create user with role PoliceOfficer
          const user = await prisma.user.create({
            data: {
              fullName: officer.fullName,
              email: officer['EMAIL ID'] ? officer['EMAIL ID'].toLowerCase() : officer.fullName.toLowerCase().replace(/\s/g, '_') + '@example.com',
              phoneNumber: officer['PHONE NO'].replace(/\D/g, ''),
              dateOfBirth: new Date('02-02-1998'),
              gender: 'Male',
              role: 'PoliceOfficer',
              password: '1234567890',
              policeOfficer: {
                create: {
                  badgeNumber: officer['BATCH NO'],
                  rank: 'Inspector', // Example rank, adjust as needed
                  joiningDate: new Date('02-02-2024'),
                },
              },
              address: {
                create: [
                  {
                    // Permanent Address
                    type: 'PermanentAddress',
                    state: 'West Bengal',
                    city: permanentAddressInfo.village.toLowerCase(),
                    district: permanentAddressInfo.district.toLowerCase(),
                    postalCode: permanentAddressInfo.pin_code,
                    address: officer['PERMANENT ADDRESS'].toLowerCase(),
                  },
                  {
                    // Present Address
                    type: 'CurrentAddress',
                    state: 'West Bengal',
                    city: presentAddressInfo.village.toLowerCase(),
                    district: presentAddressInfo.district.toLowerCase(),
                    postalCode: presentAddressInfo.pin_code,
                    address: officer['PRESENT ADDRESS'].toLowerCase(),
                  },
                ],
              },
            },
          });

          // Create police station and associate the officer
          const policeStation = await prisma.policeStation.create({
            data: {
              stationName: officer['PRESENT POSTING'].toLowerCase(),
              stationPhone: officer['PHONE NO'].replace(/\D/g, '').slice(0, 10),
              location: {
                create: {
                  state: 'West Bengal',
                  city: presentAddressInfo.village.toLowerCase(),
                  district: presentAddressInfo.district.toLowerCase(),
                  postalCode: presentAddressInfo.pin_code,
                  address: officer['PRESENT ADDRESS'].toLowerCase(),
                },
              },
            },
          });

          console.log(
            {
              user,
            },
            {
              policeStation,
            }
          );
        } catch (error) {
          console.error(`Error creating officer ${officer.fullName}:`, error);
        }
      }

      console.log('Police officers seeded successfully!');
    });
}

async function main() {
  await seedPoliceStations();
  // await seedPoliceOfficers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
