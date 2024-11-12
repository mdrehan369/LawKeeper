import { Container } from "@/components/Container";

type Props = {};

export default function Efir(props: Props) {
  return (
    <section className=" py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Law Keeper
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          <strong>Law Keeper</strong> is a pioneering digital platform designed
          to transform the way law and order are maintained by creating a
          seamless connection between citizens and law enforcement. Our goal is
          to streamline the legal and regulatory processes, making them more
          accessible, efficient, and transparent for everyone involved.
        </p>
        <p className="mt-4 text-lg text-gray-600">
          In today’s fast-paced world, managing legal procedures and ensuring
          public safety can be cumbersome, both for individuals and law
          enforcement agencies. <strong>Law Keeper</strong> simplifies this by
          providing an easy-to-use online portal that allows users to handle a
          variety of legal matters—from applying for licenses and permits to
          filing FIRs (First Information Reports) and submitting complaints.
          Gone are the days of long queues and complicated paperwork; everything
          is at your fingertips, accessible from any device, at any time.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Apply for Licenses and Permits
          </h3>
          <p className="mt-4 text-gray-600">
            Whether it's for business, firearms, or other legal permissions,
            users can quickly apply for various licenses, track their status,
            and receive notifications about their application progress.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            File FIRs and Complaints
          </h3>
          <p className="mt-4 text-gray-600">
            Users can file First Information Reports (FIRs) and complaints for
            various offenses such as theft, fraud, or cybercrime directly
            through the platform. This ensures quick registration of incidents
            and faster processing by the authorities.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Track Case Progress
          </h3>
          <p className="mt-4 text-gray-600">
            Stay informed about the status of your FIRs or complaints with
            real-time updates. Users can monitor the progress of investigations,
            from filing through to resolution.
          </p>
        </div>
      </div>

      {/* For Law Enforcement Officers Section */}
      <div className="mt-16 bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900">
            For Law Enforcement Officers
          </h3>
          <p className="mt-4 text-lg text-gray-600">
            On the other side, <strong>Law Keeper</strong> serves as a powerful
            tool for law enforcement agencies—police officers, detectives, and
            other officials involved in public safety. The platform allows them
            to:
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900">
                Efficiently Manage Reports and Applications
              </h4>
              <p className="mt-4 text-gray-600">
                Officers can access submitted complaints, FIRs, and license
                applications in a centralized system, saving time and improving
                the response rate.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900">
                Track and Assign Investigations
              </h4>
              <p className="mt-4 text-gray-600">
                Detectives and investigators can assign cases to relevant
                personnel, set priorities, and track the investigation process
                through an integrated dashboard.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900">
                Improve Communication and Coordination
              </h4>
              <p className="mt-4 text-gray-600">
                <strong>Law Keeper</strong> facilitates communication between
                various law enforcement departments, ensuring that all parties
                are up to date with ongoing cases and investigations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
        <p className="mt-4 text-lg text-gray-600">
          At <strong>Law Keeper</strong>, we believe in the power of technology
          to create a safer, more efficient society. By digitizing legal
          processes, we make it easier for citizens to interact with law
          enforcement, reduce bureaucratic red tape, and ensure that law
          enforcement agencies have the tools they need to act swiftly and
          effectively. We are committed to enhancing transparency, building
          trust, and ensuring that the legal system works for everyone—whether
          you are a citizen seeking justice or an officer maintaining public
          order.
        </p>
        <p className="mt-4 text-lg text-gray-600">
          Join us on our journey to revolutionize how law and order are upheld
          in the digital age. With <strong>Law Keeper</strong>, we are making
          the legal system smarter, more responsive, and more accessible for
          all.
        </p>
      </div>
    </section>
  );
}
