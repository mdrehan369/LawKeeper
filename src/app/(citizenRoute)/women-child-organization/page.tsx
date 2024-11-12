
export const AboutWCSO = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Women and Child Security Organization (WCSO)</h2>
        <p className="mt-4 text-lg text-gray-600">
          <strong>Women and Child Security Organization (WCSO)</strong> is dedicated to ensuring the safety, security, and well-being of women and children in our communities. We aim to address critical issues such as violence, exploitation, neglect, and discrimination faced by women and children, while empowering them to lead lives free from fear and harm.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
        <p className="mt-4 text-lg text-gray-600">
          Our mission is to create a safer environment for women and children by providing support, resources, and advocacy. Through awareness campaigns, legal assistance, shelter services, and community outreach, we are committed to making a tangible difference in the lives of those who need it most.
        </p>
      </div>

      {/* Key Objectives Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900">Prevention and Awareness</h3>
          <p className="mt-4 text-gray-600">
            Conducting public awareness programs to educate the community about women’s and children's rights, domestic violence, sexual exploitation, and child abuse.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900">Support and Empowerment</h3>
          <p className="mt-4 text-gray-600">
            Offering confidential counseling, mental health services, and legal aid to victims of domestic violence, child abuse, human trafficking, and exploitation.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900">Emergency Assistance</h3>
          <p className="mt-4 text-gray-600">
            Providing immediate assistance through emergency helplines, shelters, and resources for women and children in crisis situations.
          </p>
        </div>
      </div>

      {/* How We Help Section */}
      <div className="mt-16 bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900">How We Help</h3>
          <p className="mt-4 text-lg text-gray-600">
            WCSO provides various services to ensure the safety and well-being of women and children in our communities.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900">Shelters and Safe Houses</h4>
              <p className="mt-4 text-gray-600">
                We provide secure shelter for women and children who are victims of abuse, trafficking, or exploitation. These shelters offer food, healthcare, and emotional support.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900">Hotlines and Helplines</h4>
              <p className="mt-4 text-gray-600">
                Our 24/7 helplines offer immediate assistance for victims of abuse or exploitation, providing confidential support and directing them to available resources.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900">Counseling Services</h4>
              <p className="mt-4 text-gray-600">
                Our trained counselors provide emotional and psychological support to victims, offering trauma-informed care to help them recover and rebuild their lives.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How You Can Get Involved Section */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-gray-900">How You Can Get Involved</h3>
        <p className="mt-4 text-lg text-gray-600">
          If you’re interested in supporting the mission of WCSO, there are several ways you can contribute:
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900">Volunteer</h4>
            <p className="mt-4 text-gray-600">
              Join us in providing direct support, whether through counseling, awareness programs, or administrative tasks. Your time and effort can make a real difference.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900">Donate</h4>
            <p className="mt-4 text-gray-600">
              Your financial contribution helps us provide shelters, legal assistance, educational resources, and more to women and children in need.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900">Spread the Word</h4>
            <p className="mt-4 text-gray-600">
              Raise awareness about our work and the challenges faced by women and children in your community. Educate others about the importance of safety, rights, and justice.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-gray-900">Contact Us</h3>
        <p className="mt-4 text-lg text-gray-600">
          Reach out to us if you or someone you know needs help, or if you’d like to get involved in our mission.
        </p>
        <div className="mt-4 text-lg text-gray-600">
          <p>Phone: <span className="font-semibold">[Insert Helpline Number]</span></p>
          <p>Email: <span className="font-semibold">[Insert Email Address]</span></p>
          <p>Website: <span className="font-semibold">[Insert Website URL]</span></p>
          <div className="mt-4 space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">Facebook</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Twitter</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Instagram</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWCSO;
