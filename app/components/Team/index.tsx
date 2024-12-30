import { TeamType } from "@/types/team";
import SectionTitle from "../Common/SectionTitle";
import SingleTeam from "./SingleTeam";
import "@/styles/index.css";

const teamData: TeamType[] = [
  {
    id: 1,
    name: "Duy Nghĩa",
    designation: "215052169",
    image: "/images/team/team-01.png",
    facebookLink: "https://www.facebook.com/Duynghia301/",
    twitterLink: "https://www.instagram.com/yuin.ng/",
    instagramLink: "https://www.instagram.com/yuin.ng/",
  },
  {
    id: 2,
    name: "Du Long",
    designation: "215052223",
    image: "/images/team/team-02.png",
    facebookLink: "https://www.facebook.com/long.du.338658",
    twitterLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 3,
    name: "Hữu Vinh",
    designation: "215052155",
    image: "/images/team/team-03.png",
    facebookLink: "https://www.facebook.com/huuvinh.ngo.79",
    twitterLink: "/#",
    instagramLink: "/#",
  },
  {
    id: 4,
    name: "Minh Quân",
    designation: "215052277",
    image: "/images/team/team-03.png",
    facebookLink: "https://www.facebook.com/profile.php?id=100034751507589",
    twitterLink: "/#",
    instagramLink: "/#",
  },
];

const Team = () => {
  return (
    <section
      id="team"
      className="overflow-hidden bg-gray-1 pb-12 pt-20 dark:bg-dark-2 lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle="Đồ án công nghệ phần mềm"
            title="Nhóm 6 - Lớp 21D1TH-PM02"
            paragraph="Chúng tôi với kinh nghiệm đầy mình, tâm huyết, uy tín là trên hết"
            width="640px"
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {teamData.map((team, i) => (
            <SingleTeam key={i} team={team} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
