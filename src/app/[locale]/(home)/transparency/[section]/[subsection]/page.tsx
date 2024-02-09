import React from "react";

export default function Page({ params }: { params: { subsection: string } }) {
  return <div>{params.subsection}</div>;
}
