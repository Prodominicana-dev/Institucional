import React from "react";
import MemberCard from "./memberCard";

export default function MembersGrid({ members }: { members: any[] }) {
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
  const director = members.find((member: any) => member.isDirector);
  const otherMembers = members.filter((member) => !member.isDirector);
  return (
    <div>
      {director && (
        <div className="flex justify-center w-full">
          <div className="w-full md:w-1/3 p-3">
            <MemberCard
              key="director"
              member={director}
              className="aspect-square"
            />
          </div>
        </div>
      )}
      <div className="flex flex-wrap justify-center w-full">
        {otherMembers.map((member, index) => (
          <div key={index} className="w-full md:w-1/3 p-3">
            <MemberCard member={member} className="aspect-square w-full" />
          </div>
        ))}
      </div>
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
