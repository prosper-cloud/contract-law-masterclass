import type { LessonSection, Module, Problem } from "./types";

function S(
  id: string,
  title: string,
  paras: string[],
  extra?: Partial<LessonSection>,
): LessonSection {
  return { id, title, paras, ...extra };
}

const pIntro: Problem = {
  id: "p-intro",
  moduleId: "introduction",
  title: "Is there a contract at all?",
  level: "beginner",
  facts:
    "Ada, a 100-level student in Enugu, tells her cousin Chike: “If you help me move into the hostel on Saturday, I will give you ₦15,000.” Chike hires a keke, moves the bags, and asks for the money. Ada says it was only a family favour and that nothing was written down.",
  issues: [
    "Did Ada make an offer capable of acceptance?",
    "Did Chike accept, and was there consideration?",
    "Did the parties intend to create legal relations?",
    "Does the absence of writing prevent a simple contract?",
  ],
  rules: [
    "A simple contract requires agreement (offer and acceptance), consideration, intention to create legal relations, and capacity.",
    "Writing is not a general requirement of Nigerian contract law, although particular transactions (for example guarantees and dispositions of land) may need writing under the applicable statute.",
    "Domestic or family arrangements are often presumed not to be legally binding, but the presumption can be rebutted by evidence that the parties meant to be bound.",
  ],
  application: [
    "Ada’s words are specific: a sum of money in exchange for a defined service. That looks like an offer, not a vague family wish.",
    "Chike performed the requested act. In a unilateral-style promise, performance can be acceptance and also the consideration.",
    "The family setting raises the presumption against legal intention. The presumption is weaker if the language is commercial (“I will give you ₦15,000”) and the cousin incurred a cost in reliance. A court would look at the words, the setting, and whether they were joking.",
    "No statute requires this kind of bargain to be in writing. The lack of a document is not itself fatal.",
  ],
  conclusion:
    "There is a serious argument that a contract was formed if the court finds that the promise was meant seriously. The weakest point for Chike is intention, because of the family context. If intention is proved, the oral promise is enforceable. This is a hypothetical for practice, not a decided case.",
  authorities: [
    "Orient Bank (Nig.) Plc v Bilante International Ltd (elements of a valid contract — confirm the report)",
    "Balfour v Balfour (English authority on domestic agreements)",
    "Currie v Misa (English definition of consideration)",
  ],
};

const pOffer: Problem = {
  id: "p-offer",
  moduleId: "offer",
  title: "Market stall or true offer?",
  level: "beginner",
  facts:
    "A phone shop in Computer Village, Lagos, puts a placard in the window: “iPhone 13 — ₦180,000 while stock lasts.” Tunde walks in, puts ₦180,000 on the counter and says “I accept.” The shop says the placard was a mistake and the price is ₦320,000. Separately, the shop had emailed Bose the night before: “We offer you the last iPhone 13 at ₦180,000 if you reply by 6pm tomorrow.” Bose replied at 5pm: “I accept, but only if you add a free case.”",
  issues: [
    "Was the window placard an offer or an invitation to treat?",
    "Was Bose’s reply an acceptance or a counter-offer?",
  ],
  rules: [
    "A display of goods with a price is generally an invitation to treat, not an offer. The customer makes the offer at the counter, which the seller may accept or refuse.",
    "An offer must be certain. A specific email addressed to a named person, stating the goods and the price, is capable of being an offer.",
    "A reply that adds a new term is a counter-offer and kills the original offer (Hyde v Wrench).",
  ],
  application: [
    "The placard is the classic display. Tunde’s tender of money is the offer. The shop may refuse it. The words “while stock lasts” do not by themselves convert a shop display into a Carlill-type offer, because there is no language of reward or deposit showing a willingness to be bound to all comers.",
    "The email to Bose is addressed, definite, and timed. It is best analysed as an offer.",
    "Bose did not accept that offer. She introduced a free case. That is a counter-offer. The shop is free to reject it, and Bose cannot fall back on the original price unless the shop renews the offer.",
  ],
  conclusion:
    "Tunde has no contract at ₦180,000. Bose has no contract either, unless the shop accepts her counter-offer. Hypothetical only.",
  authorities: [
    "Pharmaceutical Society of Great Britain v Boots Cash Chemists",
    "Fisher v Bell",
    "Hyde v Wrench",
    "Carlill v Carbolic Smoke Ball Co (contrast)",
  ],
};

const pAcceptance: Problem = {
  id: "p-acceptance",
  moduleId: "acceptance",
  title: "Post, WhatsApp, and silence",
  level: "intermediate",
  facts:
    "On Monday, Kemi in Ibadan posts a letter offering to sell her generator to Lola in Kano for ₦250,000, “reply by post.” The letter reaches Lola on Thursday. Lola posts an acceptance the same afternoon. On Friday morning, before the acceptance arrives, Kemi sells the generator to someone else and sends Lola a WhatsApp: “Offer withdrawn.” Lola’s letter arrives on Monday. Lola had also told her brother to tell Kemi she was “thinking about it,” and the brother said nothing.",
  issues: [
    "When, if at all, was a contract formed?",
    "Was the revocation effective?",
    "Does silence or a message through a relative amount to acceptance?",
  ],
  rules: [
    "Acceptance must be a final, unqualified assent to the terms of the offer, communicated to the offeror, unless the offer dispenses with communication.",
    "Where the post is the contemplated or requested means, the postal rule may make acceptance complete on posting, even if the letter is delayed. The rule is excluded if the offer requires actual receipt, and it does not apply to instantaneous messages.",
    "Revocation of an offer must be communicated and is ineffective after a valid acceptance.",
    "Silence is not acceptance.",
  ],
  application: [
    "Kemi asked for a reply by post, so the postal rule is a serious candidate. Lola posted on Thursday. If the rule applies, the contract was complete on Thursday, before the WhatsApp.",
    "The Friday WhatsApp is a purported revocation. It comes too late if acceptance was complete on posting. Instant messaging is not itself under the postal rule: Entores treats instantaneous communication as effective on receipt.",
    "The brother conveyed no acceptance. Lola’s silence, or a relative’s silence, cannot bind her or complete the contract.",
  ],
  conclusion:
    "On these facts the better view is that a contract was formed when Lola posted, so the later WhatsApp did not revoke the offer. Confirm whether the court of the relevant state would apply the postal rule to a domestic letter; the rule is English common law received subject to local circumstances, not a Nigerian statute.",
  authorities: [
    "Adams v Lindsell",
    "Entores Ltd v Miles Far East Corporation",
    "Felthouse v Bindley",
    "Holwell Securities Ltd v Hughes (limit on the postal rule)",
  ],
};

const pConsideration: Problem = {
  id: "p-consideration",
  moduleId: "consideration",
  title: "Part payment and a past favour",
  level: "intermediate",
  facts:
    "Dele owes his supplier, Musa, ₦2 million due last month. Musa says: “If you pay ₦1.2 million on Friday I will let the rest go.” Dele pays ₦1.2 million on Friday. Musa later sues for the balance. Dele also says Musa should release the debt because, three months earlier, Dele had introduced Musa to a new customer “as a favour.”",
  issues: [
    "Is part payment of a debt good consideration for a promise to forgive the balance?",
    "Can the earlier introduction count as consideration?",
  ],
  rules: [
    "Consideration must be sufficient in law but need not be adequate in value. It must generally move from the promisee and must not be wholly past.",
    "A promise to pay part of a debt already due is not, without more, good consideration for a promise to discharge the whole (Pinnel’s Case; Foakes v Beer).",
    "Exceptions discussed in the cases include payment of something different, payment earlier at the creditor’s request, a composition with creditors, payment by a third party, and promissory estoppel where it would be inequitable to go back on a promise that has been relied on.",
    "Past consideration is generally no consideration, unless a service was requested, it was understood that it would be paid for, and the later promise would have been enforceable if made in advance (the exception associated with Lampleigh v Braithwait and Pao On v Lau Yiu Long).",
  ],
  application: [
    "Dele paid less than an existing debt, on the day it was in substance already due (it was overdue). Under Foakes v Beer that is not fresh consideration. Nigerian courts have not enacted the UK’s later commercial modifications, so do not assume Williams v Roffey or a statutory abolition of Foakes applies.",
    "Promissory estoppel may be argued if Dele relied on the promise and it would be inequitable for Musa to resile. Estoppel is a shield, not a cause of action (Combe v Combe). It may answer Musa’s claim for the balance; it does not automatically cancel the debt in every case. High Trees itself was a rent reduction during extraordinary circumstances, and part of the judgment was obiter.",
    "The introduction of a customer happened before the promise and was described as a favour. Nothing shows it was requested as the price of the release. It is past and probably not consideration for the later promise.",
  ],
  conclusion:
    "Musa’s claim for the balance is not defeated by consideration alone. Dele’s realistic argument is equitable estoppel, which depends on reliance and inequity, not on a new contract. The earlier favour does not supply consideration.",
  authorities: [
    "Currie v Misa",
    "Foakes v Beer",
    "Central London Property Trust Ltd v High Trees House Ltd",
    "Combe v Combe",
  ],
};

const pIntention: Problem = {
  id: "p-intention",
  moduleId: "intention",
  title: "Household pool and a shop lease",
  level: "beginner",
  facts:
    "Ngozi and her sister agree that each will put ₦20,000 a month into a box “for family emergencies, not for court.” The same week Ngozi signs a one-year lease of a shop from a landlord she has never met, at a stated rent. After a quarrel the sister keeps the box. The landlord also says the lease was “just between friends” even though it is on a printed form.",
  issues: [
    "Is the family savings arrangement legally binding?",
    "Is the shop lease binding?",
  ],
  rules: [
    "In domestic and social agreements the law often presumes that the parties did not intend legal relations. The presumption can be rebutted.",
    "In commercial agreements the presumption is that the parties did intend legal relations, unless clear words exclude that result.",
  ],
  application: [
    "The savings box is a family arrangement, and the words “not for court” point against legal intention. The presumption is not rebutted.",
    "A printed lease for rent between people who are not in a close domestic relationship is commercial. Calling it friendship after the event does not undo a formal bargain. The burden is on the landlord to show a clear exclusion of legal consequences, which a casual remark does not do.",
  ],
  conclusion:
    "The sister is unlikely to be liable in contract for the contents of the box. The lease is likely to be binding.",
  authorities: ["Balfour v Balfour", "Merritt v Merritt", "Rose and Frank Co v JR Crompton & Bros Ltd"],
};

const pCapacity: Problem = {
  id: "p-capacity",
  moduleId: "capacity",
  title: "A minor’s laptop and a company seal",
  level: "intermediate",
  facts:
    "Bisi is 17. She buys a laptop on credit from a campus seller for ₦400,000, saying she needs it for lectures, and also agrees in writing to guarantee her uncle’s ₦3 million bank loan. A registered company, Holt Books Ltd, whose objects are limited to publishing, signs a contract to buy a nightclub. The seller wants to enforce all three bargains.",
  issues: [
    "Which of Bisi’s contracts bind her?",
    "Can the company be bound by a contract outside its objects?",
  ],
  rules: [
    "At common law a minor is generally not bound by a trading contract, but may be bound by a contract for necessaries and by a beneficial contract of service or education.",
    "Necessaries are goods or services suitable to the minor’s station in life and actually required at the time.",
    "A minor’s guarantee of another person’s debt is the kind of transaction historically treated as void or unenforceable against the minor under the received Infants legislation. Confirm the Infants Law or Child’s Rights legislation of the relevant state before citing a section.",
    "A company incorporated under the Companies and Allied Matters Act has the powers of a natural person, subject to any restriction in its articles that the other party knows about, or ought to know about, under the current statute. Do not assume the old ultra vires rule still avoids every contract outside the objects clause. Check the edition of CAMA your course uses.",
  ],
  application: [
    "A laptop genuinely required for her course may be a necessary, but ₦400,000 on credit is not automatically reasonable. The seller must prove suitability and that she was not already supplied. If it is a necessary, she is liable for a reasonable price, not automatically the contract price.",
    "The guarantee is unlikely to bind her. It is not a necessary and it is a promise to answer for another’s debt.",
    "On the company, plead the current CAMA rule your lecturer uses rather than a blanket statement that “ultra vires contracts are void.” If the articles restrict the company and the seller had notice, the company may have a defence. If not, the contract may stand.",
  ],
  conclusion:
    "The guarantee should fail against Bisi. The laptop depends on the necessaries test. The nightclub contract depends on the current companies statute, not on a slogan.",
  authorities: [
    "Common-law necessaries principle (confirm Nigerian reception)",
    "Child’s Rights Act 2003, s. 277 (definition of a child — not a complete code of contractual capacity)",
    "Companies and Allied Matters Act (confirm the edition and the ultra vires section used in your course)",
  ],
};

const pTerms: Problem = {
  id: "p-terms",
  moduleId: "terms",
  title: "The clause on the back of the receipt",
  level: "intermediate",
  facts:
    "Faruk takes his danfo to a mechanic. He signs a job card headed “Repair booking” which says, in ordinary type, “I agree to the conditions.” The conditions are not on the card. After the repair he is handed a receipt which, in tiny print on the back, says the mechanic “accepts no liability for any damage howsoever caused, including negligence.” The car is returned with a ruined gearbox caused by careless work. Faruk never saw the back of the receipt.",
  issues: [
    "Was the exclusion clause incorporated?",
    "If incorporated, does it cover negligence?",
    "Is the promise about careful repair a condition, a warranty, or an innominate term?",
  ],
  rules: [
    "A term may be incorporated by signature, by reasonable notice given before or at the time of contracting, or by a consistent course of dealing.",
    "A signed document that a person chose not to read can still bind (L’Estrange v Graucob), unless there was misrepresentation, non est factum, or the document was not contractual in character.",
    "Notice of an onerous clause must be fair and timely. A clause introduced after the contract is made is too late (Olley v Marlborough Court).",
    "Exemption clauses are construed against the person relying on them. Clear words are required to exclude negligence.",
    "The right to terminate depends on the importance of the term and the seriousness of the breach, not only on a label (Hongkong Fir).",
  ],
  application: [
    "The signature was on a document that did not contain the clause and did not identify where the conditions could be read. Incorporation by signature is weak if the “conditions” were not available.",
    "The receipt came after the contract was formed. It is too late to introduce a new exclusion.",
    "Even if the words were incorporated, “no liability howsoever caused” may be wide enough in English construction cases, but a Nigerian court will still ask whether notice of such a harsh clause was reasonably given. Do not invent a statutory unfair-terms regime unless your state has one; many courses still use the common-law incorporation and construction rules, plus any applicable consumer statute you have actually been taught.",
    "Careless destruction of the gearbox is a serious breach of the implied obligation to repair with reasonable care. Faruk can claim damages whether or not he can terminate.",
  ],
  conclusion:
    "The exclusion clause was not incorporated. Faruk can sue for the damage. Hypothetical for practice.",
  authorities: [
    "L’Estrange v F Graucob Ltd",
    "Olley v Marlborough Court Ltd",
    "Thornton v Shoe Lane Parking Ltd",
    "Hongkong Fir Shipping Co Ltd v Kawasaki Kisen Kaisha Ltd",
  ],
};

export const modulesA: Module[] = [
  {
    id: "introduction",
    num: 1,
    title: "Introduction to Contract Law",
    blurb: "What a contract is, why it matters, and where Nigerian contract law comes from.",
    minutes: 18,
    level: "beginner",
    objectives: [
      "Define a contract in plain English and in formal terms.",
      "Separate an agreement from an enforceable contract.",
      "Name the usual elements of a valid simple contract.",
      "Explain the sources of Nigerian contract law without inventing statutes.",
      "Classify contracts using the standard labels.",
    ],
    prerequisites: [],
    sections: [
      S("intro", "Beginner-friendly introduction", [
        "People make promises every day. Some are serious bargains: a tailor agrees to sew an outfit for an agreed price, a landlord agrees to let a room, a supplier agrees to deliver cement. Contract law decides which promises the court will enforce, and what happens when a promise is broken.",
        "You do not need Latin to start. Start with the story of the bargain. Then attach the legal labels: offer, acceptance, consideration, intention, and capacity.",
      ], {
        simple:
          "A contract is a promise, or a set of promises, that the law will enforce. A friendly plan to have lunch usually is not.",
      }),
      S("definition", "Formal legal definition", [
        "A contract is an agreement enforceable at law. Nigerian courts, following the received common law, look for consensus ad idem — a meeting of minds on the same terms — plus the other elements required to make that agreement binding.",
        "In Orient Bank (Nig.) Plc v Bilante International Ltd (1997) 8 NWLR (Pt 515) 37, Niki Tobi JCA is widely quoted as treating offer, acceptance, consideration, intention to create legal relations, and capacity as elements of a valid contract. Read the law report before you quote him word for word in an examination. The principle itself is the standard starting point in Nigerian courses.",
      ], {
        simple:
          "Agreement plus the extra ingredients the law requires. Agreement alone is not always enough.",
        authorities: [
          {
            name: "Orient Bank (Nig.) Plc v Bilante International Ltd",
            cite: "(1997) 8 NWLR (Pt 515) 37",
            court: "Court of Appeal",
            jurisdiction: "Nigeria",
            status: "persuasive-ng",
            principle:
              "Commonly cited for the elements of a valid contract, including capacity. Confirm the report before quotation.",
          },
        ],
      }),
      S("explain", "Agreement and enforceable contract", [
        "An agreement is a shared understanding. Two friends can agree to revise together. That is an agreement. It becomes a contract only if the law is prepared to give a remedy when one person walks away.",
        "The usual filter is: was there an offer, a matching acceptance, something of value in the eye of the law (consideration), an intention to be legally bound, and capacity? Certainty of terms also matters. A court will not write the parties’ bargain for them.",
      ], {
        deep:
          "In Bilante International Ltd v NDIC (2011) LPELR-781(SC) the Supreme Court stressed consensus ad idem, and that where a particular mode of acceptance is stipulated the offeree must use it. That case is binding Nigerian authority on those points. The commercial facts should be taken from the judgment, not from a summary.",
      }),
      S("elements", "Essential elements", [
        "Offer: a definite promise to be bound if the other person accepts.",
        "Acceptance: a final “yes” to those terms, communicated in the required way.",
        "Consideration: the price of the promise. It must be real, but it need not be equal in value.",
        "Intention to create legal relations: the parties meant the promise to have legal consequences.",
        "Capacity: each party is legally able to contract.",
        "Add certainty. If the subject matter or the price is too vague, there may be no contract even if everyone used the word “agree.”",
      ]),
      S("steps", "Step-by-step breakdown", [
        "Tell the story in order. Who spoke first? What exactly was said or written? Did the other person agree to those words, or change them?",
        "Ask whether anything of value moved. A gift promise, with nothing in return, is usually unenforceable as a simple contract (a deed is a different route, and formalities must be proved).",
        "Ask about the setting. A shop, a lease, or a supply of goods usually shows legal intention. A household chat often does not.",
        "Only then classify the contract and ask about writing, terms, and remedies.",
      ]),
      S("cases", "Leading ideas from the cases", [
        "English cases still do a lot of teaching work in Nigeria because contract law was received from England. They are persuasive, not automatically binding. A later Nigerian statute or Supreme Court decision wins where they differ.",
        "Carlill shows that an offer can be made to the world and accepted by conduct. Balfour shows that a family promise may not be a contract. Currie v Misa supplies the classic definition of consideration. You will meet each case in its own chapter.",
      ]),
      S("nigeria", "Nigerian legal relevance", [
        "There is no single federal Contract Act that codifies the whole of contract law. The core rules are common law and equity, received into Nigeria, plus local statutes that deal with particular contracts.",
        "The reception date you were probably taught is 1 January 1900 for most of the country, and an earlier date (often 1 January 1863) for Lagos. The exact words sit in the High Court Law of each state. Quote your state’s law, not a guess.",
        "Statutes of general application in force in England on the reception date may apply, but only if a local statute has not replaced them and only so far as local circumstances permit. That is why you must not assume that a modern UK Act — for example the Contracts (Rights of Third Parties) Act 1999 — applies in Nigeria. It does not.",
        "Important local overlays you will meet later include the Sale of Goods Act 1893 where it still applies, state Sale of Goods Laws where they have replaced it, the Land Use Act and property statutes for land, state Illiterates Protection Laws, the Child’s Rights Act and state child legislation on status, and the Companies and Allied Matters Act for companies. Electronic records are proved under the Evidence Act; that Act is not a code of offer and acceptance.",
      ], {
        simple:
          "Nigerian contract law is mostly received English common law, corrected by Nigerian statutes and Nigerian cases. A new English Act is not Nigerian law.",
      }),
      S("comparative", "Comparative English law", [
        "English law is the historical parent, so the vocabulary matches: offer, acceptance, consideration, frustration, damages. The differences that matter in first year are usually statutory. England has reformed privity, penalties, and some consumer terms. Nigeria has not copied those statutes wholesale.",
        "When you cite Carlill, Hyde v Wrench, or Hadley v Baxendale, label them as English authorities. Then ask: has a Nigerian court adopted this principle, and is there a local statute?",
      ]),
      S("examples", "Everyday examples", [
        "Hypothetical. You pay a campus photographer a deposit to cover your faculty dinner. That is a contract: price, service, commercial setting.",
        "Hypothetical. Your roommate says “I’ll probably help you wash clothes someday.” That is too vague, and it may also lack intention.",
        "Hypothetical. A supermarket shelf with a price tag is not yet a contract. You offer to buy at the till. The shop accepts by taking payment.",
      ]),
      S("class", "Classification", [
        "Express or implied: spoken or written terms, versus terms implied by conduct or law.",
        "Bilateral or unilateral: a promise for a promise, versus a promise accepted by doing an act (the reward case).",
        "Valid, void, voidable, unenforceable. Valid means binding. Void means no contract from the start (some mistakes and some illegal bargains). Voidable means one party may set it aside (some misrepresentation, duress, and undue influence). Unenforceable means the right exists but a procedural bar, such as a missing required writing, stops the court from enforcing it.",
        "Simple contracts and specialty contracts. A simple contract needs consideration. A deed (a contract under seal, executed with the formalities the law requires) can make a promise binding without consideration. Do not call every signed paper a deed.",
      ]),
    ],
    terms: [
      { term: "Contract", plain: "A promise the law will enforce." },
      { term: "Consensus ad idem", plain: "Agreement on the same thing." },
      { term: "Simple contract", plain: "A contract that needs consideration, not a deed." },
      { term: "Void", plain: "Of no legal effect from the beginning." },
      { term: "Voidable", plain: "Valid until the entitled person sets it aside." },
    ],
    summary: [
      "A contract is an enforceable agreement, not every promise.",
      "Look for offer, acceptance, consideration, intention, capacity, and certainty.",
      "Nigerian contract law is received common law plus local statutes and cases.",
      "English cases are persuasive. Modern UK statutes are not Nigerian law unless a Nigerian law adopted them.",
    ],
    examTips: [
      "Define first, in one sentence, then apply to the facts.",
      "Do not start with damages if formation is the issue.",
      "Name the jurisdiction of every case you cite.",
      "If you are unsure of a section number, say the principle and that the section must be confirmed. A wrong section number loses more trust than a careful omission.",
    ],
    myths: [
      "“If it is not written, it is not a contract.” Most simple contracts can be oral. Writing is about proof, and about special statutes.",
      "“A contract must be fair in price.” Adequacy is not the test. Sufficiency is.",
      "“English law and Nigerian law are the same book.” The method is shared. The statute book is not.",
    ],
    problem: pIntro,
  },
  {
    id: "offer",
    num: 2,
    title: "Offer",
    blurb: "What counts as an offer, what is only an invitation to treat, and how an offer dies.",
    minutes: 20,
    level: "beginner",
    objectives: [
      "Define an offer and list its features.",
      "Distinguish an offer from an invitation to treat.",
      "Apply the rules to advertisements, displays, auctions, and tenders.",
      "Explain how offers end.",
    ],
    prerequisites: ["introduction"],
    sections: [
      S("intro", "Beginner-friendly introduction", [
        "An offer is the moment someone stops negotiating and says, in effect: “If you say yes to exactly this, I am bound.” Everything before that — price lists, menus, “make me an offer” — is usually preparation, not the offer itself.",
      ], {
        simple: "An offer is a definite proposal that becomes a contract if it is accepted while it is still open.",
      }),
      S("definition", "Formal legal definition", [
        "An offer is an expression of willingness to contract on stated terms, made with the intention that it will become binding as soon as the person to whom it is addressed accepts it.",
        "It may be made to one person, to a class, or to the world at large. Carlill v Carbolic Smoke Ball Co [1893] 1 QB 256 is the English authority for an offer to the world. Nigerian courts cite it as persuasive authority; it is not a Nigerian decision.",
      ]),
      S("explain", "Essential features", [
        "The words or conduct must show willingness to be bound, not a willingness to negotiate.",
        "The terms must be certain enough for a court to enforce. “I will sell you some of my books at a fair price” is usually too vague.",
        "The offer must be communicated. A person cannot accept an offer they do not know about. That point returns with unilateral contracts and rewards.",
      ]),
      S("itt", "Offer and invitation to treat", [
        "An invitation to treat invites other people to make offers. The person who displays goods, advertises them, or invites tenders is usually still free to say no.",
        "Pharmaceutical Society of Great Britain v Boots Cash Chemists [1953] 1 QB 401: goods on a self-service shelf are an invitation to treat. The customer offers to buy at the cashier. Fisher v Bell [1961] 1 QB 394: a knife in a shop window with a price ticket is an invitation to treat.",
        "Partridge v Crittenden [1968] 1 WLR 1204: an advertisement of goods for sale is generally an invitation to treat. Carlill is the exception that proves the care you must take: the advertisement promised £100, showed sincerity by a bank deposit, and asked readers to perform an act. It was construed as an offer.",
      ], {
        simple:
          "A price tag says “you may offer to buy.” An offer says “I am already willing to be bound.”",
        authorities: [
          {
            name: "Pharmaceutical Society v Boots",
            cite: "[1953] 1 QB 401",
            jurisdiction: "England",
            status: "english",
            principle: "Display of goods is an invitation to treat.",
          },
          {
            name: "Carlill v Carbolic Smoke Ball Co",
            cite: "[1893] 1 QB 256",
            jurisdiction: "England",
            status: "english",
            principle: "A unilateral offer may be made to the world and accepted by performance.",
          },
        ],
      }),
      S("special", "Auctions, tenders, and Nigerian illustrations", [
        "At an auction without reserve, the auctioneer’s request for bids is an invitation to treat. Each bid is an offer. Acceptance is the fall of the hammer. Where the auction is advertised as without reserve, there is a separate argument, from Warlow v Harrison, that the auctioneer is obliged to sell to the highest bidder. State that as a limited English doctrine and do not over-apply it.",
        "An invitation to tender is usually an invitation to treat. The tender is the offer. A referential bid (“₦100 less than the lowest bid”) may be invalid for uncertainty. If the invitation promises to accept the highest bid, that promise can itself be a unilateral contract about how the tenders will be considered. Read the invitation before you classify it.",
        "Hypothetical. A Balogun market stall with tomatoes and a chalkboard price is an invitation to treat. The buyer’s request for a paint bucket at that price is the offer.",
      ]),
      S("end", "Termination of an offer", [
        "Revocation: the offeror may withdraw before acceptance, but the withdrawal must be communicated. It can be communicated by a reliable third party. A unilateral offer cannot be revoked once performance has begun, if that is the better reading of Errington v Errington; at minimum, the offeror must not prevent completion after the offeree has started. Nigerian students should treat the “once performance starts” limit as the fair working rule and note that the English cases are not uniform.",
        "Rejection and counter-offer. Hyde v Wrench (1840) 49 ER 132: a counter-offer kills the original offer. A mere request for information (“would you take instalments?”) does not. Stevenson, Jacques & Co v McLean is the English contrast.",
        "Lapse of time. If a time is stated, the offer dies at the end of it. If not, it dies after a reasonable time, judged by the subject matter. Perishable goods and shares leave less time than land.",
        "Death. Death of the offeree ends the offer. Death of the offeror usually ends an offer that has not been accepted, especially if the offeree knows of the death, but a guarantee or an option may need a closer look. Do not state an absolute rule you cannot support.",
        "Failure of a condition. An offer made on the footing that a state of affairs exists falls if that state of affairs fails.",
      ]),
      S("nigeria", "Nigerian legal relevance", [
        "The offer rules above are received common law. Cite Nigerian authority where you have it. Afolabi v Polymera Industries (1967) 1 All NLR 144 is regularly cited for the linked idea that acceptance must follow a stipulated mode. Confirm the facts in All NLR.",
        "Nothing in the ordinary law of offer requires a lawyer, a stamp, or a witness. Those formalities belong to particular statutes.",
      ]),
      S("comparative", "Comparative English law", [
        "The invitation-to-treat cases (Boots, Fisher v Bell, Partridge) are English criminal or civil decisions that Nigerian contract courses adopt as statements of the common law. Label them English.",
        "England’s later consumer legislation on misleading prices is not part of this chapter. Price displays can raise statutory issues in a given Nigerian state; do not invent an offence.",
      ]),
    ],
    terms: [
      { term: "Offer", plain: "A proposal that can be accepted to make a contract." },
      { term: "Invitation to treat", plain: "An invitation to other people to make offers." },
      { term: "Counter-offer", plain: "A reply that changes the terms and rejects the original offer." },
      { term: "Revocation", plain: "Withdrawal of an offer before it is accepted." },
    ],
    summary: [
      "An offer is definite, communicated, and made with intent to be bound on acceptance.",
      "Displays, most advertisements, and requests for bids are invitations to treat.",
      "Carlill is the unilateral exception: clear promise, sincerity, acceptance by conduct.",
      "Offers die by revocation (if communicated in time), rejection, counter-offer, lapse, death, or failed condition.",
    ],
    examTips: [
      "Quote the exact words on the facts before you classify them.",
      "A price is not enough to prove an offer.",
      "Deal with counter-offers before you discuss postal acceptance. A dead offer cannot be accepted.",
    ],
    myths: [
      "“Every advertisement is an offer.” Most are invitations to treat. Carlill had special facts.",
      "“The offeror can withdraw even after valid acceptance.” No. Revocation must arrive before acceptance.",
      "“Asking a question is a counter-offer.” A request for information leaves the offer alive.",
    ],
    problem: pOffer,
  },
  {
    id: "acceptance",
    num: 3,
    title: "Acceptance",
    blurb: "What a valid yes looks like, including post, email, conduct, and silence.",
    minutes: 18,
    level: "beginner",
    objectives: [
      "State the requirements of a valid acceptance.",
      "Apply the mirror-image rule and the counter-offer rule.",
      "Explain the postal rule and its limits.",
      "Explain why silence is not acceptance, and when conduct is.",
    ],
    prerequisites: ["introduction", "offer"],
    sections: [
      S("intro", "Beginner-friendly introduction", [
        "Acceptance is the final unqualified yes. It must match the offer. “Yes, if you also do X” is not acceptance. It is a new offer.",
      ], { simple: "Acceptance is agreement to the exact offer, told to the offeror in the right way, while the offer is still open." }),
      S("definition", "Formal definition and requirements", [
        "Acceptance is the final and unqualified assent to the terms of the offer, communicated to the offeror. The Supreme Court in Bilante International Ltd v NDIC (2011) LPELR-781(SC) restated that consensus is essential, and that a stipulated mode of acceptance must be followed.",
        "The assent must be made with knowledge of the offer. A person who happens to do the act requested, without knowing of the offer, does not accept it. R v Clarke, an Australian case often taught beside the English authorities, is the usual illustration. Treat it as comparative.",
      ], {
        authorities: [
          {
            name: "Bilante International Ltd v NDIC",
            cite: "(2011) LPELR-781(SC)",
            court: "Supreme Court",
            jurisdiction: "Nigeria",
            status: "binding-ng",
            principle: "Consensus ad idem is required, and a stipulated mode of acceptance must be complied with.",
          },
        ],
      }),
      S("mirror", "Correspondence with the offer", [
        "The mirror-image rule: acceptance must not vary the offer. Hyde v Wrench shows that a counter-offer destroys the original offer. A later attempt to accept the old price comes too late.",
        "A battle of forms, common when each business uses its own printed terms, is decided by asking which set of terms was the last shot that the other side accepted by conduct. Do not assume the first document wins.",
      ]),
      S("comm", "Communication, post, and electronic messages", [
        "The general rule is that acceptance is effective when it is communicated to the offeror. Entores Ltd v Miles Far East Corporation [1955] 2 QB 327: a telex, as instantaneous communication, is effective when received. The same reasoning is applied in courses to telephone and to other live or near-live messages. Email is usually treated as instantaneous or as a message that must actually arrive, not as a posted letter. If your lecturer treats email differently, follow the lecture and say why.",
        "The postal rule is an exception. Adams v Lindsell (1818) 1 B & Ald 681: where post is the proper means, acceptance is complete when the letter is posted, not when it arrives. Household Fire Insurance v Grant supports completion even if the letter never arrives. Holwell Securities Ltd v Hughes [1974] 1 WLR 155 limits the rule: it does not apply where the offer requires actual notice, or where applying it would produce a absurdity.",
        "Revocation does not get the benefit of the postal rule. It must be received.",
      ], {
        simple: "Posting can count as a yes when letters are the expected method. A WhatsApp or email usually counts only when the other person receives it.",
        deep:
          "Brinkibon Ltd v Stahag Stahl [1983] 2 AC 34 confirms that there is no universal rule for all “instant” messages. The court looks at the parties’ intentions and at sound business practice. That is the careful way to analyse an email that arrives outside office hours.",
      }),
      S("silence", "Silence and acceptance by conduct", [
        "Felthouse v Bindley (1862) 11 CB (NS) 869 is cited for the proposition that silence is not acceptance. The uncle could not force a contract by writing “if I hear no more, the horse is mine.” Use the case with a short caution: it was a tort claim against an auctioneer, and writers have criticised how far the contract point was necessary to the decision. The principle itself — you cannot impose a contract by telling someone to speak or be bound — is good law.",
        "Conduct can accept. If someone uses goods or starts the work requested by the offer, that use can be acceptance. The conduct must be referable to the offer, not to some other explanation.",
        "A course of dealing or an express duty to speak may make silence meaningful. Those are exceptions. Do not start with them.",
      ]),
      S("nigeria", "Nigerian legal relevance", [
        "UTB (Nig.) Ltd v Ajagbule (2006) 2 NWLR (Pt 965) 447 is reported in Nigerian case digests for the statement that acceptance is an unconditional assent communicated by the offeree to the offeror. Confirm the report before you quote Abba Aji JCA.",
        "Online shopping and USSD payments are analysed with the ordinary rules unless a statute says otherwise. Clicking “pay” is usually the customer’s offer or, depending on the site’s words, the acceptance. Read the button. The Evidence Act 2011 helps a party prove an electronic record. It does not decide when the contract was formed.",
      ]),
      S("comparative", "Comparative English law", [
        "Adams, Entores, Felthouse, and Holwell are English. They are the authorities Nigerian textbooks use for communication of acceptance. Say so in the script.",
      ]),
    ],
    terms: [
      { term: "Acceptance", plain: "The final yes to an offer." },
      { term: "Mirror-image rule", plain: "The yes must match the offer." },
      { term: "Postal rule", plain: "A posted acceptance can bind when the letter is posted." },
      { term: "Counter-offer", plain: "A changed yes, which is really a new offer." },
    ],
    summary: [
      "Acceptance must be final, matching, and communicated, with knowledge of the offer.",
      "A counter-offer kills the original offer.",
      "Post may bind on posting. Instant messages bind on receipt. The postal rule has limits.",
      "Silence is not acceptance. Conduct can be.",
    ],
    examTips: [
      "Draw a timeline: offer, counter-offer, posting, revocation, receipt.",
      "Say whether the postal rule is switched on by the facts.",
      "Separate “no contract yet” from “contract, but now breached.”",
    ],
    myths: [
      "“Silence means yes if the letter says so.” It does not.",
      "“Email uses the postal rule.” The safer analysis is receipt, following Entores, unless the parties agreed otherwise.",
      "“Any performance accepts a bilateral contract.” Performance accepts a unilateral offer. A bilateral contract usually needs communication.",
    ],
    problem: pAcceptance,
  },
  {
    id: "consideration",
    num: 4,
    title: "Consideration",
    blurb: "The price of a promise: what counts, what is past, and when part-payment fails.",
    minutes: 20,
    level: "intermediate",
    objectives: [
      "Define consideration and explain its function.",
      "Distinguish executed, executory, and past consideration.",
      "Separate sufficiency from adequacy.",
      "Apply the part-payment rule and name the real exceptions.",
    ],
    prerequisites: ["introduction"],
    sections: [
      S("intro", "Beginner-friendly introduction", [
        "Consideration is what each side brings to the bargain. It is the reason the law distinguishes a contract from a gift. If Musa promises to give you his textbook for nothing, and you promise nothing and give nothing, the promise is not a simple contract.",
      ], { simple: "Consideration is the legally recognised price paid for a promise." }),
      S("definition", "Formal definition", [
        "Lush J in Currie v Misa (1875) LR 10 Ex 153 described valuable consideration as some right, interest, profit, or benefit accruing to one party, or some forbearance, detriment, loss, or responsibility given, suffered, or undertaken by the other.",
        "The Supreme Court has used the same idea. In Eyiboh v Mujaddadi (2021) LPELR-57110(SC), Kekere-Ekun JSC described consideration in those traditional terms. Confirm the report before a long quotation. The point to learn is reciprocity: something of value in the eye of the law must be given for the promise.",
      ], {
        authorities: [
          {
            name: "Currie v Misa",
            cite: "(1875) LR 10 Ex 153",
            jurisdiction: "England",
            status: "english",
            principle: "Classic definition of consideration as benefit or detriment.",
          },
          {
            name: "Eyiboh v Mujaddadi",
            cite: "(2021) LPELR-57110(SC)",
            court: "Supreme Court",
            jurisdiction: "Nigeria",
            status: "binding-ng",
            principle: "Consideration described as benefit to one side or detriment undertaken by the other. Confirm quotation.",
          },
        ],
      }),
      S("types", "Executed, executory, and past", [
        "Executory consideration is a promise for a promise. You promise to supply rice next week; the buyer promises to pay on delivery. The contract exists now.",
        "Executed consideration is where one side has already done the act the offer requested. In a unilateral contract, performing the act is both acceptance and consideration.",
        "Past consideration is something already done, with no understanding that it was the price of a later promise. It does not count. The exception: if the act was requested, payment was always in view, and the later promise is one that could have been made at the time, the later promise can be enforced. That exception is associated with Lampleigh v Braithwait and restated in Pao On v Lau Yiu Long. It is English law, applied cautiously.",
      ]),
      S("suff", "Sufficiency, adequacy, and who must provide it", [
        "Consideration must be sufficient — it must be something the law recognises — but it need not be adequate. A nominal sum can be enough. Courts do not price the bargain.",
        "Consideration must move from the promisee. Dunlop Pneumatic Tyre Co Ltd v Selfridge & Co Ltd [1915] AC 847 joins this rule to privity: a person who gave nothing and is not a party cannot sue on the promise.",
        "Performing an existing public duty is not consideration for a new promise, unless the person does more than the duty. An existing duty owed to a third party can be consideration. An existing contractual duty owed to the same promisor is the difficult case. Foakes v Beer says part payment of a debt is not enough. Williams v Roffey Bros [1991] 1 QB 1, an English Court of Appeal case, said a practical benefit can be consideration for a promise to pay more for an existing duty. Do not present Williams v Roffey as Nigerian law. It may be cited as persuasive, and it does not overrule Foakes v Beer on debts.",
      ]),
      S("part", "Part payment, equity, and High Trees", [
        "Pinnel’s Case and Foakes v Beer (1884) 9 App Cas 605: payment of a smaller sum does not discharge a larger debt already due. Something different — a chattel instead of money, or earlier payment at the creditor’s request — can.",
        "Other escapes: a composition agreement among creditors, and payment by a third party.",
        "Promissory estoppel. In Central London Property Trust Ltd v High Trees House Ltd [1947] KB 130, Denning J said a promise to accept a lower rent, intended to be binding and acted upon, could stop the landlord claiming the full rent for the wartime period. The wider statement was obiter, because the landlord was not actually suing for the reduced period. Combe v Combe [1951] 2 KB 215: estoppel is a shield, not a sword. It does not create a new cause of action where there is no consideration.",
        "D & C Builders v Rees shows that estoppel will not help a person who extracted the promise by taking advantage of the other side’s hardship.",
      ], {
        simple:
          "Paying less than you already owe is not, by itself, a new bargain. Equity may stop a creditor going back on a promise if you truly relied on it and it would be unfair to retreat.",
      }),
      S("nigeria", "Nigerian legal relevance", [
        "Consideration remains an element of the Nigerian simple contract. There has been no general statutory abolition of the doctrine. NNB Ltd v Odiase is among the cases cited in appellate judgments for the proposition that consideration must move from the promisee. Confirm that citation in the report you use.",
        "When you argue estoppel in a Nigerian court, rely on Nigerian equity jurisdiction and treat High Trees as persuasive English authority, not as a local statute.",
      ]),
      S("comparative", "Comparative English law", [
        "England still has consideration. Williams v Roffey and later discussion of penalties (Cavendish) are English developments. Cite them as comparative unless you have a Nigerian case that follows them.",
      ]),
    ],
    terms: [
      { term: "Consideration", plain: "The legal price of a promise." },
      { term: "Sufficient", plain: "Real in the eye of the law." },
      { term: "Adequate", plain: "Equal in market value. Not required." },
      { term: "Past consideration", plain: "Something already finished before the promise. Usually worthless." },
      { term: "Promissory estoppel", plain: "A promise without consideration that can be used as a defence when it was relied on." },
    ],
    summary: [
      "Consideration is benefit or detriment, bargained for.",
      "It must be sufficient, not necessarily adequate, and it must move from the promisee.",
      "Past consideration fails, subject to a narrow requested-service exception.",
      "Part payment of a debt does not discharge the balance. Estoppel may restrain the creditor.",
    ],
    examTips: [
      "Identify who the promisee is. Ask what they gave or promised.",
      "Do not use estoppel as if it were consideration. Say which one you are using.",
      "Flag Williams v Roffey as English and limited.",
    ],
    myths: [
      "“The price must be fair or there is no contract.” That confuses adequacy with sufficiency, and it confuses consideration with unconscionability.",
      "“A moral duty is consideration.” It is not, without a requested bargain.",
      "“Estoppel lets you sue on a gift.” Combe v Combe says the opposite.",
    ],
    problem: pConsideration,
  },
  {
    id: "intention",
    num: 5,
    title: "Intention to Create Legal Relations",
    blurb: "When the parties meant the law to care about their promise.",
    minutes: 14,
    level: "beginner",
    objectives: [
      "Explain why intention is separate from consideration.",
      "Apply the domestic and commercial presumptions.",
      "Show how each presumption is rebutted.",
    ],
    prerequisites: ["introduction", "consideration"],
    sections: [
      S("intro", "Beginner-friendly introduction", [
        "Two people can exchange something of value and still not want a lawsuit. Roommates who share cooking are not usually making contracts. A distributor and a retailer usually are. Intention is the legal name for that difference.",
      ], { simple: "Intention asks: did they mean to be able to sue, or were they only arranging their lives?" }),
      S("definition", "Formal position", [
        "An agreement is not a contract unless the parties intended to create legal relations. The test is objective. The court asks what a reasonable person would think the words and the setting meant, not what one party secretly hoped.",
      ]),
      S("presumptions", "The two presumptions", [
        "Domestic and social agreements. Balfour v Balfour [1919] 2 KB 571: a husband’s promise of a monthly allowance, made while the marriage was intact, was not enforceable. The Court of Appeal presumed that the parties did not intend legal relations.",
        "The presumption is rebutted when the context is not ordinary domestic life. Merritt v Merritt [1970] 1 WLR 1211: spouses who had separated, and who put a house agreement in writing, were held to intend legal relations. Jones v Padavatton is a further English illustration of a family arrangement that stayed outside contract.",
        "Commercial agreements. The presumption is the other way. Parties in business are taken to intend legal consequences. Rose and Frank Co v JR Crompton & Bros Ltd shows that clear words — an “honourable pledge” clause — can rebut the presumption. The words must be clear. A later excuse that “we were only joking” is rarely enough.",
      ], {
        authorities: [
          {
            name: "Balfour v Balfour",
            cite: "[1919] 2 KB 571",
            jurisdiction: "England",
            status: "english",
            principle: "Domestic agreements are presumed not to create legal relations.",
          },
          {
            name: "Merritt v Merritt",
            cite: "[1970] 1 WLR 1211",
            jurisdiction: "England",
            status: "english",
            principle: "The domestic presumption can be rebutted, especially after separation and where terms are written.",
          },
        ],
      }),
      S("contrast", "Intention is not consideration", [
        "A family member can provide consideration — for example, paying money — and still fail on intention. Equally, a commercial deal has intention even if you later discover that consideration failed for a different reason. Analyse them as separate elements. Examiners set facts that pass one and fail the other.",
      ]),
      S("nigeria", "Nigerian legal relevance", [
        "Nigerian courts apply the same common-law presumptions. Social arrangements around weddings, extended-family upkeep, and informal contribution clubs need a careful look at the words used. An esusu or ajo may be social, or it may be a structured financial arrangement. Do not classify it until you have the rules the members actually adopted.",
        "There is no Nigerian statute that abolishes the requirement of intention for ordinary contracts.",
      ]),
      S("examples", "Everyday examples", [
        "Hypothetical. “Come to my birthday and I will feed you” is social.",
        "Hypothetical. A written agreement between two cousins to run a provision shop, with capital, profit share, and a bank account, is much closer to a partnership contract. The family link does not automatically keep the law out.",
      ]),
    ],
    terms: [
      { term: "Legal intention", plain: "A serious willingness to be bound in law." },
      { term: "Rebuttable presumption", plain: "A starting point the evidence can overturn." },
      { term: "Honour clause", plain: "Words that say the agreement is binding in honour only." },
    ],
    summary: [
      "Intention is required and it is judged objectively.",
      "Domestic agreements start with a presumption of no legal intention. Commercial agreements start with the opposite presumption.",
      "Both presumptions can be rebutted by clear evidence.",
      "Intention and consideration are different questions.",
    ],
    examTips: [
      "State the presumption, then the facts that support or rebut it.",
      "Written terms and separation are powerful in family cases.",
      "Do not find a contract merely because someone is upset.",
    ],
    myths: [
      "“Relatives can never contract.” They can. The presumption is only a starting point.",
      "“Business people can escape by saying they did not read the clause.” The objective test usually stops that argument.",
    ],
    problem: pIntention,
  },
  {
    id: "capacity",
    num: 6,
    title: "Capacity to Contract",
    blurb: "Minors, impaired capacity, companies, and illiterate parties.",
    minutes: 16,
    level: "intermediate",
    objectives: [
      "Explain the general effect of minority on a contract.",
      "Apply the necessaries rule without overstating it.",
      "Identify capacity issues for companies and illiterate parties.",
      "Know which statutes to confirm before citing a section.",
    ],
    prerequisites: ["introduction"],
    sections: [
      S("intro", "Beginner-friendly introduction", [
        "Capacity asks whether the law allows this person, or this organisation, to be bound. The most examined example is the minor. A minor can take the benefit of many contracts. The question is usually whether the other party can enforce the contract against the minor.",
      ], { simple: "Capacity is the legal power to be bound. Age, mental state, and the rules governing companies are the main limits." }),
      S("minor", "Minors", [
        "A child is a person under 18 for the purposes of the Child’s Rights Act 2003, section 277, in states where that Act applies. Not every state has adopted the Act in the same form. Age tells you who is a child. It does not by itself list which contracts bind them.",
        "The common-law rules, as taught in Nigeria, are these. A contract for necessaries binds the minor. Necessaries are goods or services suitable to the minor’s condition in life and actually needed at the time of supply. The minor pays a reasonable price, which may be less than the contract price. A luxury that the minor already has enough of is not a necessary.",
        "A beneficial contract of service, apprenticeship, or education can bind the minor if, taken as a whole, it is for the minor’s benefit. A trading contract generally does not bind the minor.",
        "Contracts under which a minor acquires an interest in land, or shares, are voidable: the minor may repudiate them during minority or within a reasonable time after majority. Confirm the classification your textbook uses. Writers do not always use “voidable” in the same way.",
        "The Infant Relief Act 1874 is an English statute discussed in Nigerian textbooks as a statute of general application. Some states have their own Infants Laws. Do not cite a section until you have checked the law of the state in the problem. In particular, do not assume that every contract by a minor is void. That overstates even the 1874 Act.",
      ], {
        deep:
          "Guarantees given by a minor, and loans said to have been used for necessaries, are common traps. The loan itself is not a necessary. If the lender wants to recover, they may have to show an equitable right to stand in the shoes of the supplier of necessaries. That restitutionary route is narrow. Say that it is disputed and fact-sensitive.",
      }),
      S("other", "Other limits", [
        "A person who, because of mental incapacity or intoxication, cannot understand the nature of the transaction, and the other party knows it, may avoid the contract. The burden is not light. Necessaries can still be charged at a reasonable price.",
        "Illiterates Protection Laws, which are state laws, generally require that a document signed by an illiterate person be read over and explained, often before a jurat is endorsed. If the statute of that state is not complied with, the document may be unenforceable against the illiterate party. Cite the state law, not a fictional federal section.",
        "Companies. Under the Companies and Allied Matters Act a company is a separate person. Older cases treated acts outside the objects as ultra vires and void. Later reforms restored a wider capacity, while still giving effect to restrictions that the other party knew of. Use the section your current CAMA syllabus specifies. Do not answer a 2020s problem with only a 1960s ultra vires rule.",
        "Public bodies and statutory corporations can contract only within the powers the statute gives them. An act outside those powers may be ultra vires in the public-law sense. That is different from a private company’s capacity.",
      ]),
      S("nigeria", "Nigerian legal relevance", [
        "Always name the state if the problem names one. Infants legislation, illiterates protection, and sale of goods are not uniform.",
        "Capacity is the fifth element associated with Orient Bank v Bilante. It is not an afterthought to be mentioned in the last line only.",
      ]),
      S("comparative", "Comparative English law", [
        "English law on minors was heavily statutory (Infants Relief Act 1874, later replaced in England by the Minors’ Contracts Act 1987). The 1987 Act is not a Nigerian statute. Do not cite it as the law of Nigeria.",
      ]),
    ],
    terms: [
      { term: "Capacity", plain: "Legal ability to be bound by a contract." },
      { term: "Minor", plain: "A person under the age of majority, generally under 18." },
      { term: "Necessaries", plain: "Goods or services suitable to, and actually needed by, the minor." },
      { term: "Ultra vires", plain: "Beyond the powers of a company or public body." },
      { term: "Jurat", plain: "A statement that a document was read and explained to an illiterate party." },
    ],
    summary: [
      "Minors are bound by necessaries and by beneficial contracts of service or education, not generally by trading contracts.",
      "Confirm the state’s infants legislation before citing a section.",
      "Mental incapacity and intoxication can make a contract voidable if the other party knew.",
      "Illiterates Protection Laws and CAMA are statutory overlays. Check the current text.",
    ],
    examTips: [
      "Define necessary, then apply both parts: suitable, and actually required.",
      "Do not say “all minors’ contracts are void.”",
      "Separate the minor’s liability from a guarantor’s liability.",
    ],
    myths: [
      "“A minor can never be sued.” They can be sued for a reasonable price for necessaries.",
      "“The UK Minors’ Contracts Act 1987 applies in Lagos.” It does not.",
      "“Every company contract outside the objects clause is void.” Check current CAMA first.",
    ],
    problem: pCapacity,
  },
  {
    id: "terms",
    num: 7,
    title: "Terms of a Contract",
    blurb: "Express and implied terms, conditions, warranties, and exclusion clauses.",
    minutes: 18,
    level: "intermediate",
    objectives: [
      "Distinguish representations from terms.",
      "Classify conditions, warranties, and innominate terms.",
      "Explain how terms are incorporated.",
      "Apply the rules on exclusion clauses without inventing a statutory code.",
    ],
    prerequisites: ["introduction", "offer", "acceptance"],
    sections: [
      S("intro", "Beginner-friendly introduction", [
        "Once a contract exists, the next question is: what did they actually agree? Some statements are sales talk made before the contract. Some are terms. Some terms are so important that a breach lets the other side walk away. Some only sound in damages.",
      ], { simple: "Terms are the contents of the bargain. Not every sentence spoken during negotiation becomes a term." }),
      S("rep", "Representations and terms", [
        "A representation is a statement that induces the contract but is not itself a promise inside it. If it is false, the remedy is the law of misrepresentation, not an action for breach of a term.",
        "Whether a statement is a term depends on the objective intention. Timing, the importance of the statement, any special knowledge of the speaker, and whether the agreement was later reduced into writing all matter. A written contract that looks complete will usually be treated as containing the terms, and oral extras face the parol evidence rule. That rule has exceptions: collateral contracts, ambiguity, and vitiating factors. Do not treat it as absolute.",
      ]),
      S("types", "Conditions, warranties, intermediate terms", [
        "A condition is a major term. Breach gives the innocent party a choice: terminate and claim damages, or affirm and claim damages.",
        "A warranty is a lesser term. Breach gives damages only.",
        "The parties’ own label is relevant but not conclusive. Courts look at the commercial importance of the term.",
        "Hongkong Fir Shipping Co Ltd v Kawasaki Kisen Kaisha Ltd [1962] 2 QB 26 introduced, or at least confirmed, the innominate or intermediate term. You ask how serious this breach was. If it deprives the innocent party of substantially the whole benefit of the contract, they may terminate. If not, they have damages only. Seaworthiness in that case was innominate.",
      ], {
        authorities: [
          {
            name: "Hongkong Fir Shipping v Kawasaki",
            cite: "[1962] 2 QB 26",
            jurisdiction: "England",
            status: "english",
            principle: "Some terms are innominate: the right to terminate depends on the effect of the breach.",
          },
        ],
      }),
      S("implied", "Implied terms", [
        "Terms implied in fact fill a gap so obvious that both parties must have intended it. The officious bystander and business efficacy tests are the English tools (The Moorcock; Shirlaw v Southern Foundries). Use them sparingly. Courts do not improve a bad bargain.",
        "Terms implied in law attach to categories of contract. Under the Sale of Goods Act 1893, where it still applies, or under a state Sale of Goods Law that has replaced it, there are implied terms about title, correspondence with description, and quality. Check which statute the state in the problem actually uses before you number a section. Many states still work from the 1893 Act’s structure: description, merchantable or satisfactory quality, and fitness where the buyer relies on the seller.",
        "A term can also be implied by custom if the custom is certain, reasonable, and notorious, and if it does not contradict an express term.",
      ]),
      S("exclusion", "Incorporation and exclusion clauses", [
        "Incorporation by signature: L’Estrange v F Graucob Ltd [1934] 2 KB 394. A person who signs a contractual document is bound by its terms even if they did not read them, unless they were misled about the effect of the clause, or the defence of non est factum applies.",
        "Incorporation by notice: the clause must be in a document that a reasonable person would expect to contain terms, and notice must be given before or when the contract is made. Chapelton v Barry UDC: a ticket that looked like a receipt did not incorporate a clause on its back. Olley v Marlborough Court: a notice in a hotel bedroom came too late because the contract was made at the desk. Thornton v Shoe Lane Parking: a harsh clause at an automatic car park had to be drawn to attention before the contract was formed, and the tiny print failed.",
        "Interfoto Picture Library v Stiletto [1989] QB 433: a particularly onerous clause needs fair notice. The more unusual the clause, the more the party relying on it must do to bring it home.",
        "Construction: exemption clauses are read against the person who put them forward. Liability for negligence is not excluded unless the words are clear. A clause that excludes “all liability” may be wide enough, but do not be casual about it.",
        "A fundamental breach does not, by itself, wipe out an exclusion clause. Photo Production Ltd v Securicor Transport Ltd [1980] AC 827 is the English House of Lords authority. The question is whether, properly construed, the clause covers the breach that happened.",
      ], {
        simple:
          "A harsh clause counts only if it was part of the contract in time, and only if its words actually cover what went wrong.",
      }),
      S("nigeria", "Nigerian legal relevance", [
        "Standard-form contracts are everywhere: courier waybills, bank account mandates, phone tariffs, tenancy forms. Nigerian courts use the common-law incorporation and construction rules. Some consumer or hire-purchase statutes in particular states restrict exclusion clauses. Cite the statute only if it is on your syllabus and you can name it accurately.",
        "An illiterate party’s signature raises the Illiterates Protection Law as well as L’Estrange. Deal with both.",
      ]),
      S("comparative", "Comparative English law", [
        "The Unfair Contract Terms Act 1977 is an English statute. It does not apply in Nigeria merely because the common law does. You may mention it as comparative context. Your answer should turn on incorporation, construction, and any Nigerian statute you can actually identify.",
      ]),
    ],
    terms: [
      { term: "Condition", plain: "A core term. Breach can end the contract." },
      { term: "Warranty", plain: "A lesser term. Breach gives damages only." },
      { term: "Innominate term", plain: "A term whose remedy depends on how serious the breach was." },
      { term: "Exclusion clause", plain: "A term that tries to cut down liability." },
      { term: "Incorporation", plain: "The process by which a term becomes part of the contract." },
    ],
    summary: [
      "Separate pre-contract statements from terms.",
      "Conditions, warranties, and innominate terms control the remedy for breach.",
      "Implied terms come from fact, law, or custom. Sale of goods statutes matter, but check the state.",
      "Exclusion clauses must be incorporated in time and construed strictly. UCTA 1977 is not Nigerian law.",
    ],
    examTips: [
      "Ask “was it a term?” before you ask “was it breached?”",
      "On exclusion clauses, use a fixed order: incorporation, construction, then any statute.",
      "A signature is powerful, but it is not magic if the document did not contain the clause.",
    ],
    myths: [
      "“If they signed, every later receipt is binding.” Later paper is usually too late.",
      "“Fundamental breach always kills an exemption clause.” Photo Production says construction comes first.",
      "“Merchantable quality is identical in every Nigerian state.” The statute in force may differ.",
    ],
    problem: pTerms,
  },
];
