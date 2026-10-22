import type { GlossaryEntry } from "./types";

export const glossary: GlossaryEntry[] = [
  {
    id: "acceptance",
    term: "Acceptance",
    plain: "The final, matching yes to an offer.",
    formal:
      "A final and unqualified expression of assent to the terms of an offer, communicated to the offeror while the offer is open.",
    example: "Lola posts a letter that says she will buy the generator on the exact terms Kemi offered.",
    related: ["Offer", "Counter-offer", "Postal rule"],
    authority: "Bilante International Ltd v NDIC (2011) LPELR-781(SC)",
  },
  {
    id: "anticipatory-breach",
    term: "Anticipatory breach",
    plain: "A clear refusal to perform, made before performance is due.",
    formal:
      "A repudiation occurring before the time fixed for performance, which the innocent party may accept by ending the contract and suing at once.",
    example: "A supplier writes in March that a June delivery will not happen.",
    related: ["Repudiation", "Breach", "Mitigation"],
    authority: "Hochster v De La Tour (1853) 2 E & B 678 (English)",
  },
  {
    id: "capacity",
    term: "Capacity",
    plain: "The legal power to be bound by a contract.",
    formal:
      "The competence of a person or body to enter a binding contract, limited for minors, some persons with impaired understanding, and some corporations.",
    example: "A 17-year-old may be bound to pay a reasonable price for necessaries, but not for a trading speculation.",
    related: ["Necessaries", "Minor"],
  },
  {
    id: "condition",
    term: "Condition",
    plain: "A core term. Breaking it can end the contract.",
    formal:
      "A term so important that any breach entitles the innocent party to terminate and claim damages.",
    example: "A wedding-dress contract that says delivery on the morning of the wedding is of the essence.",
    related: ["Warranty", "Innominate term"],
  },
  {
    id: "consensus",
    term: "Consensus ad idem",
    plain: "Agreement on the same thing.",
    formal: "A meeting of minds on the same terms, judged objectively.",
    example: "Both parties understand that the price is ₦250,000 for one named generator.",
    related: ["Offer", "Acceptance"],
    authority: "Bilante International Ltd v NDIC",
  },
  {
    id: "consideration",
    term: "Consideration",
    plain: "The legal price of a promise.",
    formal:
      "A right, interest, profit, or benefit to one party, or a forbearance, detriment, loss, or responsibility given or undertaken by the other, as the price of a promise.",
    example: "Chike moves the bags because Ada promised ₦15,000. The work is the price of the promise.",
    related: ["Past consideration", "Promissory estoppel"],
    authority: "Currie v Misa; Eyiboh v Mujaddadi",
  },
  {
    id: "counter-offer",
    term: "Counter-offer",
    plain: "A reply that changes the terms and rejects the original offer.",
    formal:
      "A response that proposes different terms. It destroys the original offer and becomes a new offer.",
    example: "“I accept, but only if you add a free case.”",
    related: ["Acceptance", "Offer"],
    authority: "Hyde v Wrench (1840) 49 ER 132 (English)",
  },
  {
    id: "damages",
    term: "Damages",
    plain: "Money awarded for a breach.",
    formal:
      "A sum intended, so far as money can, to put the innocent party in the position they would have occupied if the contract had been performed, subject to remoteness and mitigation.",
    example: "The difference between the contract price of cement and the price of a reasonable substitute.",
    related: ["Remoteness", "Mitigation", "Expectation"],
    authority: "Robinson v Harman; Hadley v Baxendale (English)",
  },
  {
    id: "duress",
    term: "Duress",
    plain: "Illegitimate pressure that forces someone into a contract.",
    formal:
      "Coercion of the will by illegitimate pressure, including violence, threats, or economic pressure, which is a cause of the decision to contract. The contract is voidable.",
    example: "A threat to spread a fabricated allegation unless a service contract is signed immediately.",
    related: ["Undue influence", "Rescission"],
  },
  {
    id: "frustration",
    term: "Frustration",
    plain: "The contract dies because an outside event radically changes performance.",
    formal:
      "Automatic discharge where a supervening event, without fault of either party, makes performance impossible, illegal, or radically different.",
    example: "The only hall hired for a dinner burns down a month before the event.",
    related: ["Force majeure", "Breach"],
    authority: "Taylor v Caldwell (English)",
  },
  {
    id: "invitation",
    term: "Invitation to treat",
    plain: "An invitation to other people to make offers.",
    formal:
      "A preliminary communication that is not intended to be binding as soon as the addressee assents. Displays, most advertisements, and auction requests for bids are examples.",
    example: "A price card on a phone in a Computer Village window.",
    related: ["Offer"],
    authority: "Pharmaceutical Society v Boots (English)",
  },
  {
    id: "misrepresentation",
    term: "Misrepresentation",
    plain: "A false statement of fact that helps cause the contract.",
    formal:
      "An unambiguous false statement of existing fact, addressed to the other party, which induces them to contract. It may be fraudulent, negligent, or innocent.",
    example: "A dealer says an engine was rebuilt last month when it was not.",
    related: ["Rescission", "Term"],
    authority: "Derry v Peek (fraud — English)",
  },
  {
    id: "offer",
    term: "Offer",
    plain: "A definite proposal that can be accepted to make a contract.",
    formal:
      "An expression of willingness to contract on stated terms, made with the intention that it shall become binding as soon as it is accepted.",
    example: "“I offer you the last iPhone 13 for ₦180,000 if you reply by 6pm.”",
    related: ["Invitation to treat", "Acceptance"],
    authority: "Carlill v Carbolic Smoke Ball Co (English)",
  },
  {
    id: "postal-rule",
    term: "Postal rule",
    plain: "A posted acceptance can bind when the letter is posted.",
    formal:
      "Where post is the contemplated means of acceptance, the acceptance is complete on posting, unless the offer requires actual receipt or the rule would produce manifest inconvenience.",
    example: "Lola posts her acceptance on Thursday. Kemi’s WhatsApp on Friday is too late.",
    related: ["Acceptance"],
    authority: "Adams v Lindsell; Holwell Securities v Hughes (English)",
  },
  {
    id: "privity",
    term: "Privity",
    plain: "Only the parties can sue on the contract.",
    formal:
      "The doctrine that a contract cannot confer rights or impose burdens on a person who is not a party to it, subject to limited exceptions.",
    example: "Rashidat cannot sue the tailor on a contract her cousin made, merely because the outfit was for her.",
    related: ["Consideration", "Agency", "Assignment"],
    authority: "Ikpeazu v ACB; Dunlop v Selfridge",
  },
  {
    id: "rescission",
    term: "Rescission",
    plain: "Undoing a voidable contract and restoring both sides.",
    formal:
      "The remedy that sets a voidable contract aside and requires substantial mutual restoration, unless a bar applies.",
    example: "Sola returns the car and seeks her money back after discovering the dealer’s fraud.",
    related: ["Misrepresentation", "Duress"],
  },
  {
    id: "specific-performance",
    term: "Specific performance",
    plain: "A court order to do what was promised.",
    formal:
      "An equitable, discretionary decree compelling performance, granted where damages are inadequate and no bar applies.",
    example: "A contract for a particular plot of land is a stronger candidate than a contract for ordinary bags of cement.",
    related: ["Damages", "Injunction"],
  },
  {
    id: "warranty",
    term: "Warranty",
    plain: "A lesser term. Breaking it gives damages, not a right to walk away.",
    formal: "A term whose breach sounds in damages only and does not entitle the innocent party to terminate.",
    example: "A minor late delivery of spare buttons on an outfit that was otherwise ready.",
    related: ["Condition", "Innominate term"],
  },
  {
    id: "undue-influence",
    term: "Undue influence",
    plain: "Abuse of trust to push someone into a bargain.",
    formal:
      "Equitable doctrine under which a contract is voidable if procured by the improper use of influence arising from a relationship of trust and confidence.",
    example: "A dependant signs away property to a carer without independent advice, in a transaction that calls for explanation.",
    related: ["Duress", "Rescission"],
    authority: "Etridge (No 2) is English comparative authority",
  },
  {
    id: "past-consideration",
    term: "Past consideration",
    plain: "Something already done before the promise. Usually not enough.",
    formal:
      "An act completed before a promise is made, and not done at the promisor’s request as the price of that promise. It does not support a simple contract.",
    example: "Dele introduced a customer months ago, and only later asks that a debt be cancelled because of it.",
    related: ["Consideration"],
  },
  {
    id: "promissory-estoppel",
    term: "Promissory estoppel",
    plain: "A relied-on promise that can be used as a defence.",
    formal:
      "An equitable doctrine preventing a party from insisting on strict legal rights where they made a clear promise, intended to be acted on, which was acted on, and where it would be inequitable to resile.",
    example: "A landlord who promised half rent during a crisis may be stopped from claiming the unpaid half for that period.",
    related: ["Consideration"],
    authority: "High Trees (English, and the famous statement is obiter)",
  },
  {
    id: "innominate",
    term: "Innominate term",
    plain: "A term whose remedy depends on how serious the breach was.",
    formal:
      "A term that is neither a condition nor a warranty. Termination is available only if the breach deprives the innocent party of substantially the whole benefit.",
    example: "A short delay under a seaworthiness obligation that does not wreck the adventure.",
    related: ["Condition", "Warranty"],
    authority: "Hongkong Fir (English)",
  },
  {
    id: "mitigation",
    term: "Mitigation",
    plain: "Reasonable steps that limit loss after a breach.",
    formal:
      "The rule that a claimant cannot recover loss which they could reasonably have avoided. It is a limit on damages, not a separate duty that creates liability.",
    example: "Buying replacement cement at a sensible price after the supplier repudiates.",
    related: ["Damages", "Anticipatory breach"],
  },
  {
    id: "ratification",
    term: "Ratification",
    plain: "Approving an agent’s act after it happened.",
    formal:
      "The principal’s subsequent adoption of an unauthorised act done purportedly on their behalf, which relates back if the conditions for ratification are met.",
    example: "A company board adopts a contract a manager signed without authority, while the company already existed.",
    related: ["Agency"],
  },
  {
    id: "exclusion-clause",
    term: "Exclusion clause",
    plain: "A term that tries to cut out liability.",
    formal:
      "A contractual term that excludes or limits a liability that would otherwise arise. It must be incorporated and, on its true construction, cover the breach.",
    example: "Tiny print on the back of a receipt handed over after the repair was agreed.",
    related: ["Incorporation", "Term"],
    authority: "Olley v Marlborough Court; Photo Production v Securicor (English)",
  },
];

export function getGlossary(id: string): GlossaryEntry | undefined {
  return glossary.find((g) => g.id === id);
}
