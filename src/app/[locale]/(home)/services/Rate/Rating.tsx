// import React from "react";
// import { Rating } from "@mantine/core";
// import { useState } from "react";
// import { useDisclosure } from "@mantine/hooks";
// import { Modal, Button } from "@mantine/core";
// import { radio } from "@material-tailwind/react";

// export const RatingServices = () => {
//   const [value, setValue] = useState(3);
//   const [opened, { open, close }] = useDisclosure(false);
//   return (
//     <>
//       <Modal
//        opened={opened}
//        onClose={close} 
//        centered
//        style={{
//         overflow:"auto"
//        }}
//        >
      
//           <div className="py-3 sm:max-w-xl sm:mx-auto   ">
//             <div className="bg-white min-w-xl flex flex-col rounded-xl  ">
//               <div className="px-12 py-5">
//                 <h2 className="text-gray-800 text-2xl font-semibold">
//                   Your opinion matters to us!
//                 </h2>
//               </div>
//               <div className="bg-gray-200 w-full flex flex-col items-center">
//                 <div className="flex flex-col items-center py-6 space-y-3">
//                   <span className="text-lg text-gray-800">
//                     How was quality of the service?
//                   </span>
//                   <div className="flex space-x-3">
//                     <Rating value={value} onChange={setValue} />
//                   </div>
//                 </div>
//                 <div className="w-3/4 flex flex-col">
//                   <textarea
//                     rows={3}
//                     className="p-4 text-gray-500 rounded-xl resize-none"
//                   >
//                     Leave a message, if you want
//                   </textarea>
//                   <button className="py-3 my-8 text-lg bg-gradient-to-r bg-red-700 rounded-xl text-white">
//                     Rate now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//       </Modal>

//       <Button style={{ width:'270px', background:'red', borderRadius:'200PX'}}  onClick={open}>Calificanos</Button>
//     </>
//   );
// };
