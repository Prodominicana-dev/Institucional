import React from "react";
import MemberCard from "./memberCard";

export default function MembersGrid({ members }: { members: any[] }) {
  // console.log(" members:", members);

  return (
    <div>
      {members?.length > 2 ? (
        <ThreeOrMoreMembersGrid members={members} />
      ) : members?.length === 2 ? (
        <TwoMembersGrid members={members} />
      ) : (
        <SingleMemberGrid member={members} />
      )}
    </div>
  );
}

function ThreeOrMoreMembersGrid({ members }: { members: any[] }) {
  // console.log(" members 3:", members);

  const filterByFirstWord = (members: any[], keywords: string[]) => {
    return members.filter((member) => {
      const baseRole = member.role.trim().split(" ")[0].toLowerCase(); 
      return keywords.some((keyword) =>
        baseRole.startsWith(keyword.toLowerCase())
      );
    });
  };

  const directores = filterByFirstWord(members, ["Directora", "Director"]);

  // console.log("Directores/as:", directores);

  const subdirectores = filterByFirstWord(members, [ "Subdirector", "Subdirectora",]);
  // console.log("Subdirectores/as:", subdirectores);

  const gerentes = filterByFirstWord(members, ["Gerente"]);
  // console.log("Gerentes:", gerentes);

  // const director = members.find(
  //   (member: any) => member.role === "Directora Ejecutiva"
  // );
  // console.log(" director:", director);

  const otherMembers = members.filter((member) => !member.isDirector);
  return (
    <div>
      {directores && (
         <div className="flex flex-wrap justify-center w-full">
        {directores.map((member, index) => (
          <div key={index} className="w-full md:w-1/3 p-3">
            <MemberCard member={member} className="aspect-square w-full" />
          </div>
        ))}
      </div>
      )}
      {subdirectores && (
         <div className="flex flex-wrap justify-center w-full">
        {subdirectores.map((member, index) => (
          <div key={index} className="w-full md:w-1/3 p-3">
            <MemberCard member={member} className="aspect-square w-full" />
          </div>
        ))}
      </div>
      )}
      {gerentes && (
         <div className="flex flex-wrap justify-center w-full">
        {gerentes.map((member, index) => (
          <div key={index} className="w-full md:w-1/3 p-3">
            <MemberCard member={member} className="aspect-square w-full" />
          </div>
        ))}
      </div>
      )}
      {/* <div className="flex flex-wrap justify-center w-full">
        {otherMembers.map((member, index) => (
          <div key={index} className="w-full md:w-1/3 p-3">
            <MemberCard member={member} className="aspect-square w-full" />
          </div>
        ))}
      </div> */}
    </div>
  );
}

function TwoMembersGrid({ members }: { members: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
      {members.map((member, index) => (
        <MemberCard key={index} member={member} />
      ))}
    </div>
  );
}

function SingleMemberGrid({ member }: { member: any[] }) {
  return (
    <div className="flex justify-center">
      {member.map((member, index) => (
        <div key={index} className="w-full md:w-3/6 p-3">
          <MemberCard key={index} member={member} />
        </div>
      ))}
    </div>
  );
}
