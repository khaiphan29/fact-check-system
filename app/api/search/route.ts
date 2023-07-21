import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data: { claim: string } = await request.json();
  //   console.log(data);
  const rating: number = Math.floor(Math.random() * 3 + 1);
  const fact: string = `A principal defence against uncontrolled inflammation, and against viral infection 
  in general, is provided by T regulatory lymphocytes (Tregs). Treg levels 
  have been reported to be low in many COVID-19 patients and can be increased 
  by vitamin D supplementation. Low vitamin D levels have been associated with 
  an increase in inflammatory cytokines and a significantly 
  increased risk of pneumonia and viral upper respiratory tract infections. 
  Vitamin D deficiency is associated with an increase in thrombotic 
  episodes, which are frequently observed in COVID-19. Vitamin D deficiency 
  has been found to occur more frequently in patients with obesity and 
  diabetes. These conditions are reported to carry a higher mortality 
  in COVID-19. If vitamin D does in fact reduce the severity 
  of COVID-19 in regard to pneumonia/ARDS, inflammation, inflammatory 
  cytokines and thrombosis, it is our opinion that supplements would 
  offer a relatively easy option to decrease the impact of the pandemic.`;
  const claim: string = data.claim;
  const url: string = "https://google.com";
  const provider: string = "VnExpress";
  return new NextResponse(
    JSON.stringify({ rating, claim, fact, url, provider })
  );
}
