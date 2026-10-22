import type { LessonSection, Module, Problem } from "./types";

function S(
  id: string,
  title: string,
  paras: string[],
  extra?: Partial<LessonSection>,
): LessonSection {
  return { id, title, paras, ...extra };
}

const pVit: Problem = {
  id: "p-vitiating",
  moduleId: "vitiating",
  title: "The repaired car that was never repaired",
  level: "intermediate",
  facts:
    "Sola wants a used car for her business. The seller, a dealer, says “the engine was fully rebuilt last month and it has never been in an accident.” Both statements are false, and the dealer knows it. Sola pays ₦3.5 million. She would not have bought the car if she had known the truth. A week later the dealer also tells her that if she does not sign a separate service contract “today,” he will report a made-up debt to her family head and to her church. She signs.",
  issues: [
    "What kind of misrepresentation is the statement about the engine, and what remedies does Sola have?",
    "Is the service contract affected by duress or undue influence?",
  ],
  rules: [
    "A misrepresentation is a false statement of existing fact, addressed to the other party, which induces the contract.",
    "Fraudulent misrepresentation is a statement made knowingly, without belief in its truth, or recklessly (Derry v Peek).",
    "The representee may rescind, subject to the bars (affirmation, lapse of time, impossibility of restitution, and third-party rights), and may claim damages for fraud.",
    "Duress is illegitimate pressure, including economic or personal pressure, that leaves no practical alternative and induces the contract. A threat to reveal a true fact may still be unlawful pressure; a threat based on a fabrication is a stronger case.",
  ],
  application: [
    "The engine and accident statements are facts, not opinions or sales puff. The dealer knew they were false. That is fraud. Sola was induced. She can seek rescission of the sale and damages, including on the tort measure.",
    "Rescission must be prompt. If she keeps using the car as her own for a long period after discovering the truth, she may be held to have affirmed. A week of ordinary use, while she investigates, is not affirmation by itself.",
    "The service contract is a second bargain. The threat to spread a fabricated allegation, used to force an immediate signature, is illegitimate pressure. If it was a cause of her signature, duress is made out even if she had other motives. The contract is voidable.",
  ],
  conclusion:
    "The sale is voidable for fraudulent misrepresentation, with damages. The service contract is voidable for duress. Hypothetical only.",
  authorities: ["Derry v Peek", "Barton v Armstrong (comparative / Privy Council)"],
};

const pPrivity: Problem = {
  id: "p-privity",
  moduleId: "privity",
  title: "The cousin who was not a party",
  level: "intermediate",
  facts:
    "Halima contracts with a tailor: “Make two aso-ebi outfits, one for me and one for my cousin Rashidat, each to be ready on Friday, for ₦80,000 which I have paid.” The tailor delivers Halima’s outfit and a badly sewn one for Rashidat. Rashidat wants to sue the tailor. Halima wants to sue as well. The tailor says Rashidat gave no consideration and signed nothing.",
  issues: [
    "Can Rashidat enforce the contract?",
    "Can Halima recover for the failure to clothe Rashidat?",
  ],
  rules: [
    "The doctrine of privity is that a person who is not a party to a contract cannot sue on it, and a contract cannot impose a burden on a stranger.",
    "Consideration must move from the promisee. The two ideas often travel together, but they are not the same.",
    "The Contracts (Rights of Third Parties) Act 1999 does not apply in Nigeria.",
    "Recognised common-law routes around privity include agency, a trust of a promise, assignment of a contractual right, and covenants that run with land in the cases the property statutes allow. Bills of lading have their own rules.",
  ],
  application: [
    "Rashidat did not negotiate, did not pay, and is not named as a contracting party. She is a beneficiary, not a party. Ikpeazu v African Continental Bank and later Nigerian cases keep the general rule. She cannot sue on the contract unless an exception is proved. None of the facts show agency, a trust, or an assignment.",
    "Halima is a party and she provided the consideration. She can sue for breach. Her damages are her own loss. Whether she can recover the cost of putting Rashidat in the position the contract promised depends on the expectation measure and on mitigation. She is not stopped merely because the outfit was to be worn by someone else. Do not award Rashidat’s personal disappointment as if Rashidat were the claimant.",
  ],
  conclusion:
    "Rashidat’s claim on the contract fails for privity. Halima’s claim succeeds, and damages are assessed on Halima’s loss. Hypothetical only.",
  authorities: [
    "Dunlop Pneumatic Tyre Co Ltd v Selfridge",
    "Chuba Ikpeazu v African Continental Bank Ltd",
    "Beswick v Beswick (English comparison on a party suing)",
  ],
};

const pDischarge: Problem = {
  id: "p-discharge",
  moduleId: "discharge",
  title: "The hall, the flood, and the walk-away",
  level: "advanced",
  facts:
    "A faculty hires Chief Events Ltd to stage a dinner in a hired hall on 20 June for ₦1.5 million, half paid in advance. On 1 June the hall burns down without anyone’s fault, and no comparable hall is available in the city that week. Chief Events says it will not perform. The faculty says Chief Events is in breach because it should have found a tent. The contract says nothing about fire.",
  issues: [
    "Is the contract frustrated or breached?",
    "What happens to the money already paid?",
  ],
  rules: [
    "Frustration discharges a contract where a supervening event, without the fault of either party, makes performance impossible or radically different from what was undertaken.",
    "Inconvenience, extra expense, or a rise in price is not enough (Davis Contractors Ltd v Fareham UDC).",
    "Self-induced frustration is not frustration. A force majeure clause, if there is one, is construed to see whether it covers the event and what consequence it stipulates. It is not the same thing as the doctrine.",
    "At common law, money paid before frustration was not always recoverable, and money due ceased to be due. The English Law Reform (Frustrated Contracts) Act 1943 altered that position in England. Do not apply the 1943 Act in Nigeria unless you have established that it is in force in the relevant state as a statute of general application or by local re-enactment. Many answers should use the common-law position and then flag the statute as something to confirm.",
  ],
  application: [
    "The hall was essential. Its destruction without fault makes the agreed performance impossible, not merely more expensive. A tent is a different contract. This is frustration in the line of Taylor v Caldwell, not a breach.",
    "Chief Events’ announcement is not a repudiation if the contract is already discharged.",
    "On the advance payment, state the common-law starting point and the need to confirm whether a frustrated-contracts statute applies in the state. Do not invent a section that refunds the money automatically.",
  ],
  conclusion:
    "The contract is frustrated. It is not a breach. The fate of the ₦750,000 depends on the common law as received and on any local statute you confirm. Hypothetical only.",
  authorities: ["Taylor v Caldwell", "Davis Contractors v Fareham Urban District Council"],
};

const pBreach: Problem = {
  id: "p-breach",
  moduleId: "breach",
  title: "The supplier who says he will not deliver",
  level: "intermediate",
  facts:
    "On 1 March, Peak Cement contracts to deliver 200 bags to a builder on 1 May. On 10 March Peak writes: “We will not deliver. Sell your site or find another supplier.” The builder immediately buys 200 bags elsewhere at a higher price. On 20 April Peak writes again: “We have changed our mind and will deliver on 1 May.” The builder refuses.",
  issues: [
    "Was there an anticipatory breach?",
    "Was the builder entitled to treat the contract as ended and buy elsewhere?",
    "Can Peak revive the contract in April?",
  ],
  rules: [
    "An anticipatory breach is a clear refusal, before performance is due, to perform. The innocent party may accept the repudiation and sue at once, or may affirm and wait for the date of performance.",
    "Hochster v De La Tour is the English source of the right to sue at once.",
    "Once the repudiation is accepted, the contract is at an end. The repudiating party cannot unilaterally revive it.",
    "The innocent party must mitigate. Buying a reasonable substitute is mitigation, not a failure to be ready.",
  ],
  application: [
    "The 10 March letter is unequivocal. It is an anticipatory breach.",
    "The builder accepted it by buying elsewhere and refusing to wait. That acceptance ends the contract.",
    "The April letter is too late. There is no contract left to perform.",
    "Damages are the difference between the contract price and the reasonable cost of the substitute, subject to remoteness and to proof that the substitute was reasonable.",
  ],
  conclusion:
    "The builder lawfully ended the contract on 10 March and may claim the extra cost of cover. Peak cannot force performance in April.",
  authorities: ["Hochster v De La Tour", "White and Carter (Councils) Ltd v McGregor (contrast, where repudiation is not accepted)"],
};

const pRemedies: Problem = {
  id: "p-remedies",
  moduleId: "remedies",
  title: "Late cloth and a unique dress",
  level: "advanced",
  facts:
    "A bride contracts with a designer for a specific lace dress, “to be delivered on the morning of the wedding, time of the essence,” for ₦600,000. The designer delivers it the next day. The bride hired a ready-made dress on the wedding morning for ₦150,000 and lost a non-refundable ₦80,000 makeup booking because she waited at the designer’s shop. She also claims ₦2 million for distress. She wants the original dress as well, by specific performance, and she wants the designer’s advertised “late fee of ₦5 million” which the receipt calls liquidated damages.",
  issues: [
    "What damages are recoverable?",
    "Is specific performance available?",
    "Is the ₦5 million clause a penalty?",
  ],
  rules: [
    "The aim of damages is to put the innocent party in the position they would have been in if the contract had been performed (Robinson v Harman), subject to remoteness, mitigation, and the nature of the loss.",
    "Hadley v Baxendale: loss is recoverable if it arises naturally, or if it was in the reasonable contemplation of both parties because of special facts communicated to the defendant.",
    "Specific performance is equitable and discretionary. It is refused where damages are adequate. Unique goods are a classic case where it may be granted. It will not be granted to compel personal services in the ordinary way.",
    "A liquidated damages clause that is a genuine pre-estimate, or that protects a legitimate interest and is not out of all proportion, may be upheld. A penalty imposed to punish is not. Dunlop Pneumatic Tyre Co Ltd v New Garage is the older English test. Cavendish Square v Makdessi is the modern UK Supreme Court restatement. Cite Cavendish as comparative English law, not as a Nigerian statute.",
  ],
  application: [
    "Time was of the essence, so the late delivery is a breach that can justify rejection of late performance. The ₦150,000 substitute is a natural loss and a reasonable mitigation.",
    "The makeup booking is recoverable only if the designer knew, or the loss was an obvious consequence of a wedding-morning delivery. If the bride told the designer it was her wedding dress, the lost booking is more easily within the second limb of Hadley. Distress damages for a purely commercial contract are tightly limited. A wedding dress is one of the exceptional contracts whose purpose is a particular experience, but Nigerian courts do not automatically award a large sum for upset. Claim it cautiously and do not invent a figure as if it were a tariff.",
    "Specific performance of the late dress, after the wedding, is pointless. Damages are the proper remedy. A court would not force the designer to serve her personally.",
    "₦5 million on a ₦600,000 dress, with no evidence that it estimates a real loss, looks like a penalty. The bride should not be advised to count on it. Her proven loss is the safer claim.",
  ],
  conclusion:
    "She recovers the cost of the substitute and any special loss that was communicated. The distress claim is weak or modest at best. Specific performance is inappropriate after the date has passed. The ₦5 million clause is vulnerable as a penalty.",
  authorities: ["Hadley v Baxendale", "Robinson v Harman", "Dunlop Pneumatic Tyre v New Garage", "Cavendish Square Holding BV v Makdessi (comparative)"],
};

const pContexts: Problem = {
  id: "p-contexts",
  moduleId: "contexts",
  title: "The agent, the online shop, and the guarantee",
  level: "advanced",
  facts:
    "Bola tells her friend Tobi, in front of a supplier, “Tobi will order cement for my site and I will pay.” Tobi orders 100 bags in Bola’s name. Bola refuses to pay, saying Tobi had no written authority. Separately, Bola’s brother signs a paper: “I guarantee Bola’s cement account,” and the supplier did not give him a copy or require any formality. The cement was ordered through the supplier’s website, which said “by paying you accept our terms” and linked to a page excluding liability for late delivery.",
  issues: [
    "Did Tobi have authority to bind Bola?",
    "Is the brother’s guarantee enforceable?",
    "Are the website terms part of the contract?",
  ],
  rules: [
    "Actual authority may be express or implied. Apparent authority exists where the principal represents to the third party that the agent may act, and the third party relies on that representation.",
    "A guarantee is a promise to answer for another’s debt. Under the received Statute of Frauds, a guarantee generally must be evidenced in writing and signed by the guarantor. Confirm that this requirement is in force in the relevant state and has not been replaced. An indemnity, which is a primary promise, is not always caught by the same rule. The label the parties use is not conclusive.",
    "Website terms are incorporated only if reasonably brought to the other party’s attention before the contract is made.",
  ],
  application: [
    "Bola’s statement, made to the supplier, is both express authority and a representation of authority. Tobi’s order in her name binds her. The lack of a written agency agreement does not matter. Agency does not generally need writing.",
    "The brother’s paper uses the word guarantee and he signed it. If the state still requires writing for guarantees, this writing may be enough, provided it identifies the debt. Give him the benefit of an argument that the paper is too vague if it does not identify the account. Do not invent extra formalities.",
    "The website drew attention to terms before payment and provided a link. A late-delivery exclusion may be incorporated. It still has to be construed. A total exclusion of delay, if the supplier’s main obligation is timely delivery of cement to a live site, may be read down. There is no automatic electronic-contract code that changes this analysis.",
  ],
  conclusion:
    "Bola is bound by the cement contract. The guarantee depends on the writing and on certainty. The exclusion clause may be in the contract but may not cover the delay that actually occurred. Hypothetical only.",
  authorities: ["Freeman and Lockyer v Buckhurst Park Properties (apparent authority — English)", "Statute of Frauds 1677 (confirm local application)"],
};

const pExam: Problem = {
  id: "p-exam",
  moduleId: "exams",
  title: "A full formation problem, under time",
  level: "advanced",
  facts:
    "You have 45 minutes. Use the generator problem in the Acceptance chapter (Kemi and Lola) and add this sentence: Lola is 17, and the generator is her only source of power for a refrigerated drug stall that is her sole income.",
  issues: [
    "Formation: offer, postal acceptance, revocation.",
    "Capacity: is Lola bound, and is Kemi bound?",
  ],
  rules: [
    "Use the acceptance rules from Module 3.",
    "Then apply capacity. A minor who carries on a trade is not generally liable on a trading contract. The other adult party can still be bound if the minor chooses to enforce. Necessaries are a different category.",
  ],
  application: [
    "Work the timeline first and reach a conclusion on formation.",
    "Only if a contract was formed, ask whether Lola’s minority lets her resist enforcement. A generator bought to stock a drug business looks like a trading asset, not food, clothing, or a student necessary. Kemi may be unable to enforce against Lola. Lola may still sue Kemi if she wishes, because the adult party is bound.",
    "Do not spend the last ten minutes on damages. The question is formation and capacity.",
  ],
  conclusion:
    "State a clear result on formation, then a clear result on who can sue whom. Leave a margin note that the state’s infants law must be confirmed.",
  authorities: ["Adams v Lindsell", "Necessaries principle", "State infants legislation — confirm"],
};

export const modulesB: Module[] = [
  {
    id: "vitiating",
    num: 8,
    title: "Vitiating Factors",
    blurb: "Misrepresentation, mistake, duress, undue influence, and illegality.",
    minutes: 22,
    level: "intermediate",
    objectives: [
      "Define misrepresentation and separate its three classes.",
      "Outline mistake without collapsing it into misrepresentation.",
      "Explain duress and undue influence.",
      "State the effect of illegality carefully.",
    ],
    prerequisites: ["terms"],
    sections: [
      S("intro", "Beginner-friendly introduction", [
        "A contract can look perfect — offer, acceptance, consideration — and still be set aside because the consent was not real. These are the vitiating factors. They make a contract void or voidable. The difference matters: a void contract never existed; a voidable contract exists until the innocent party rescinds it.",
      ], { simple: "Vitiating factors are legal reasons to undo a contract because consent was flawed or the bargain is forbidden." }),
      S("misrep", "Misrepresentation", [
        "A misrepresentation is a false statement of existing fact, made by one party to the other, which induces the contract. A statement of opinion is not enough unless the speaker does not actually hold the opinion, or is in a position where the opinion implies a fact. Future promises belong to breach of contract if they are terms, not to misrepresentation. Silence is not a misrepresentation, except where there is a duty to speak: a half-truth, a change of facts before the contract, a fiduciary relationship, or a contract of the utmost good faith such as insurance.",
        "Fraudulent: made knowingly, without belief in its truth, or recklessly, careless whether it is true or false. Derry v Peek (1889) 14 App Cas 337 is the English definition. The remedy is rescission and damages for the tort of deceit. Damages are not limited by the contract remoteness rules.",
        "Negligent: a statement made without reasonable grounds for belief. At common law, Hedley Byrne v Heller is the route where there is a special relationship and an assumption of responsibility. Some courses also teach a statutory negligent-misrepresentation action. The English Misrepresentation Act 1967 is not automatically Nigerian law. Do not cite section 2(1) as a Nigerian section unless your state has received or re-enacted it and you have checked.",
        "Innocent: a false statement believed on reasonable grounds. The usual remedy is rescission. Damages are not available merely because the statement was false, unless a statute you can identify provides them, or the statement was also a term.",
        "Rescission puts the parties back, as far as possible, to where they started. Bars: affirmation after knowledge of the truth, lapse of time (especially for innocent misrepresentation), inability to make substantial restitution, and a third party who has acquired rights in good faith for value. A completed transfer to an innocent purchaser can bar rescission of a voidable contract.",
      ], {
        simple: "A lie, or a false fact that helped cause the contract, can allow the other person to undo the deal. How much money they also get depends on whether the lie was deliberate, careless, or honest.",
        authorities: [
          {
            name: "Derry v Peek",
            cite: "(1889) 14 App Cas 337",
            jurisdiction: "England",
            status: "english",
            principle: "Fraud requires knowledge of falsity, absence of belief, or recklessness.",
          },
        ],
      }),
      S("mistake", "Mistake", [
        "Common mistake: both parties share the same false assumption. If the subject matter never existed, the contract may be void, as in a sale of goods that had already perished. A mistake about quality makes the contract void only if it renders the thing radically different. Great Peace Shipping v Tsavliris [2003] QB 679 is the modern English test and it rejected the wider equitable doctrine of Solle v Butcher. Treat Great Peace as English law. Nigerian equity may still be argued, but you should not pretend Solle v Butcher is the current English position.",
        "Mutual mistake: the parties are at cross-purposes. If a reasonable person could not say which meaning prevailed, there is no consensus and no contract.",
        "Unilateral mistake: one party is mistaken and the other knows. A mistake about the identity of the person, where identity is fundamental and the parties were not face to face, can make the contract void. Face-to-face dealings usually create a contract with the person physically present, which is voidable for fraud if they misdescribed themselves, not void for mistake. The English cases (Cundy v Lindsay, Phillips v Brooks, Shogun Finance v Hudson) are difficult. State the face-to-face presumption and the void/voidable consequence for third parties. Do not bluff a single “rule of identity.”",
        "A mistake in signing a document (non est factum) is available only where the document was radically different from what the signer thought, and the signer was not careless. It is rare.",
      ]),
      S("pressure", "Duress and undue influence", [
        "Duress to the person, and duress of goods, are established. Economic duress is recognised where there is illegitimate pressure, causation, and no practical alternative. A threat to break a contract can be illegitimate if it is used to extract a new bargain, but a warning of a genuine commercial difficulty is not duress. Barton v Armstrong, a Privy Council decision, is often cited for the point that duress need only be a cause, not the only cause.",
        "Undue influence is the improper use of influence, not necessarily a threat. Actual undue influence must be proved. Presumed undue influence arises from a relationship of trust and confidence plus a transaction that calls for explanation. The presumption can be rebutted by showing that the weaker party had full information and independent advice. Royal Bank of Scotland v Etridge (No 2) [2001] UKHL 44 is the leading English restatement, especially for sureties who are spouses. It is comparative authority in Nigeria. Use it as a structure, and look for Nigerian cases on guarantees given by family members before you treat every word of Etridge as binding.",
        "A bank that takes a guarantee from a person who may be under another’s influence can lose the guarantee if it does not take reasonable steps to be sure the surety understood the transaction.",
      ]),
      S("illegal", "Illegality and public policy", [
        "A contract to commit a crime, or a contract prohibited by statute, may be unenforceable or void. Read the statute. Some prohibitions strike at the contract. Some only impose a penalty and leave the contract intact. That distinction is everything, and it depends on the wording and purpose of the particular Act.",
        "Contracts contrary to public policy — for example, certain restraints of trade that go further than necessary to protect a legitimate interest — may be unenforceable. A restraint of trade clause in an employment contract is not automatically void. Ask what interest it protects, and whether the time, area, and activity are reasonable.",
        "Unconscionable bargains are an equitable category, not a general power to rewrite a hard bargain. Inequality plus oppressive terms plus unconscionable conduct is the shape of the argument. Do not use “unconscionable” as a synonym for expensive.",
      ]),
      S("nigeria", "Nigerian legal relevance", [
        "Fraud, duress, and undue influence are received equitable and common-law doctrines used in Nigerian courts. Statutory illegal contracts often arise under regulatory laws: foreign exchange, procurement, land consent under the Land Use Act, and professional licensing. The effect of a missing Governor’s consent in a land transaction is a specialised property point. Do not reduce it to a one-line contract slogan; follow your land-law authority.",
      ]),
    ],
    terms: [
      { term: "Misrepresentation", plain: "A false statement of fact that helps cause the contract." },
      { term: "Rescission", plain: "Setting a voidable contract aside." },
      { term: "Duress", plain: "Illegitimate pressure that forces consent." },
      { term: "Undue influence", plain: "Abuse of a relationship of trust to procure a bargain." },
      { term: "Voidable", plain: "Binding until the innocent party elects to undo it." },
    ],
    summary: [
      "Misrepresentation is a false fact that induces. Fraud, negligence, and innocence lead to different money remedies.",
      "Rescission has bars. Act promptly.",
      "Mistake rarely avoids a contract. Identity mistakes turn on whether the contract is void or only voidable.",
      "Duress and undue influence make a contract voidable. Illegality depends on the statute.",
    ],
    examTips: [
      "Classify the statement: puff, opinion, future promise, or fact.",
      "Say void or voidable, and say why a third party cares.",
      "Do not cite the Misrepresentation Act 1967 as Nigerian unless you have checked.",
    ],
    myths: [
      "“Any false advertisement is fraudulent misrepresentation.” Puff and opinion are not facts, and fraud needs a state of mind.",
      "“Mistake and misrepresentation are the same.” One is a shared or one-sided error; the other is a statement.",
      "“A hard bargain is undue influence.” Pressure or a relationship must be proved.",
    ],
    problem: pVit,
  },
  {
    id: "privity",
    num: 9,
    title: "Privity of Contract",
    blurb: "Who can sue, who can be sued, and the exceptions that are real.",
    minutes: 16,
    level: "intermediate",
    objectives: [
      "State the traditional rule and its link to consideration.",
      "Apply it to a third party who was meant to benefit.",
      "List only the exceptions you can explain.",
      "Explain why the UK 1999 Act is not the Nigerian rule.",
    ],
    prerequisites: ["consideration"],
    sections: [
      S("intro", "Beginner-friendly introduction", [
        "If Ada contracts with a painter to paint Bola’s house, Bola may be delighted. She is not, without more, a person who can sue the painter. Privity is the rule that contract is private to the people who made it.",
      ], { simple: "Only the parties can sue or be sued on a contract. A beneficiary is not automatically a party." }),
      S("rule", "The rule", [
        "A contract cannot confer a right to sue, or impose an obligation, on a person who is not a party to it. Dunlop Pneumatic Tyre Co Ltd v Selfridge & Co Ltd [1915] AC 847 is the English House of Lords statement. Viscount Haldane linked privity with the rule that consideration must move from the promisee.",
        "The ideas are related but distinct. Privity asks: are you a party? Consideration asks: did you provide the price of the promise? A person can be a party and still fail if someone else provided all the consideration. Examiners like that split.",
        "Nigerian courts apply the doctrine. Chuba Ikpeazu v African Continental Bank Ltd (1965) NMLR 374 is a frequently cited Supreme Court authority that a person who is not a party cannot enforce the contract. Confirm the report before a long quotation. NOSPETCO Oil & Gas Ltd v Olorunnimbe (2022) 1 NWLR (Pt 1812) 495, a Court of Appeal decision reported in secondary sources, describes privity as the relation that entitles the parties to sue each other and prevents a third party from doing so. Mark that citation “confirm in NWLR” if you intend to quote it.",
      ], {
        authorities: [
          {
            name: "Dunlop v Selfridge",
            cite: "[1915] AC 847",
            jurisdiction: "England",
            status: "english",
            principle: "Only a party who provided consideration can sue on the contract.",
          },
          {
            name: "Ikpeazu v African Continental Bank Ltd",
            cite: "(1965) NMLR 374",
            court: "Supreme Court",
            jurisdiction: "Nigeria",
            status: "binding-ng",
            principle: "A stranger to a contract cannot enforce it. Confirm the report.",
          },
        ],
      }),
      S("exceptions", "Exceptions you can actually use", [
        "Agency. The agent contracts for a principal. The principal, once disclosed or in the cases where the undisclosed principal may intervene, is the party in law. The agent who acts within authority drops out of a normal disclosed-principal contract.",
        "Trust of a contractual right. Equity sometimes treats the promisee as holding the benefit on trust for a third party. The intention to create a trust must be real. Courts do not invent a trust merely because someone was meant to benefit.",
        "Assignment. A contractual right, if it is not personal, can be assigned to a third party who may then sue. Assignment has formal and notice requirements. A burden cannot be assigned without consent. Novation replaces the contract and needs the consent of all concerned.",
        "Land. Certain covenants run with land under property statutes. That is a property answer, not a general contract exception.",
        "Statutory exceptions. Some Nigerian statutes give a third party a right of action in a defined setting, for example some insurance and carriage regimes. Name the statute or do not claim the exception. The English Contracts (Rights of Third Parties) Act 1999 lets a named or identified third party enforce a term in England. It has no force in Nigeria.",
        "A party to the contract can still sue. In Beswick v Beswick the widow failed as a stranger in her personal capacity on one analysis, but succeeded as administratrix of the promisee’s estate. The promising party’s estate could enforce the bargain. Use that distinction.",
      ]),
      S("nigeria", "Nigerian legal relevance", [
        "Start every privity answer with the Nigerian position: the common-law rule applies, and the 1999 UK Act does not. Then test agency, trust, assignment, and any statute on the facts.",
        "Collateral contracts are not really an exception. They are a second contract between the third party and the defendant, with their own offer, acceptance, and consideration. If you use one, prove those elements.",
      ]),
    ],
    terms: [
      { term: "Privity", plain: "The rule that only parties can sue on a contract." },
      { term: "Third party", plain: "Someone outside the contract, even if they benefit from it." },
      { term: "Assignment", plain: "Transfer of a contractual right to someone else." },
      { term: "Novation", plain: "A new contract that replaces a party, with everyone’s consent." },
    ],
    summary: [
      "Strangers cannot sue or be sued on the contract.",
      "Privity and consideration are related but separate.",
      "Agency, trust, assignment, land covenants, and specific statutes are the main ways round the rule.",
      "The UK 1999 Act is not Nigerian law.",
    ],
    examTips: [
      "Ask “who are the parties?” in the first paragraph.",
      "Do not invent a statutory exception.",
      "If the promisee sues, say what loss the promisee suffered.",
    ],
    myths: [
      "“If the contract mentions you, you can sue.” Mentioning a beneficiary does not make them a party.",
      "“Nigeria has abolished privity.” It has not, by the 1999 English Act or by any general federal Contract Act.",
    ],
    problem: pPrivity,
  },
  {
    id: "discharge",
    num: 10,
    title: "Discharge of Contract",
    blurb: "How a contract ends: performance, agreement, breach, and frustration.",
    minutes: 18,
    level: "intermediate",
    objectives: [
      "Explain discharge by performance, including substantial performance.",
      "Explain discharge by agreement.",
      "Separate discharge by breach from discharge by frustration.",
      "State the effect of frustration on money already paid, with the statutory caution.",
    ],
    prerequisites: ["terms", "breach"],
    sections: [
      S("intro", "Beginner-friendly introduction", [
        "Discharge means the contract is brought to an end, so that future obligations fall away. It does not always mean nobody can sue. A contract discharged by breach still supports an action for damages. A contract discharged by frustration generally does not, because nobody is at fault.",
      ], { simple: "Discharge is the legal ending of a contract. The reason it ended decides who can still claim money." }),
      S("performance", "Performance", [
        "The strict rule is that performance must match the contract. A partial performance is not treated as full performance unless the other party accepts it, or the contract is divisible into parts with separate prices, or the doctrine of substantial performance applies.",
        "Substantial performance: where the breach is minor in relation to the whole, the performer may claim the price subject to a deduction for the defects. It does not apply to a major failure. Building contracts are the usual illustration. Exact cases should be named only when you know them; the principle is the working tool.",
        "A tender of performance, properly made, can put the other party in breach if they refuse to accept it.",
      ]),
      S("agreement", "Agreement", [
        "What the parties made by agreement they can unmake by agreement. Consideration is required for a simple contract of discharge. Where both sides still have obligations, each one’s release of the other is consideration (bilateral discharge).",
        "Accord and satisfaction is the name for a new agreement (the accord) plus the performance of what it requires (the satisfaction) in place of the old obligation.",
        "Where one side has fully performed and the other has not, a bare promise to release the remaining duty needs consideration or a deed. Waiver and promissory estoppel may stop the party who waived from going back, if the other relied on the waiver.",
        "A contract may also build in its own ending: a fixed term, a notice clause, or a condition subsequent.",
      ]),
      S("frustration", "Frustration", [
        "Frustration ends the contract automatically when a supervening event, arising without fault, makes performance impossible, illegal, or radically different from what the parties undertook. Taylor v Caldwell (1863) 3 B & S 826: the music hall burned down, so both parties were excused.",
        "Davis Contractors Ltd v Fareham Urban District Council [1956] AC 696: a shortage of labour that made the job longer and more expensive was not frustration. The test is a radical change in the obligation, not disappointment or less profit.",
        "National Carriers Ltd v Panalpina [1981] AC 675 accepts that a lease can in theory be frustrated, but only in rare circumstances. Do not frustrate a lease merely because the property is inconvenient for a period.",
        "Self-induced frustration does not count. If the event was caused by the party’s own breach or choice, the doctrine is unavailable.",
        "A force majeure clause is a contractual allocation of risk. Read it. If it covers the event, the clause governs and the common-law doctrine may have been excluded for that event. If it does not cover the event, frustration can still be argued. Force majeure is not a free-standing excuse outside the contract.",
        "Effect. The contract ends from the date of the frustrating event. Obligations already accrued may remain. Future obligations fall away. At common law the loss often lay where it fell. The English Law Reform (Frustrated Contracts) Act 1943 allows adjustment of money paid and expenses in England. It is an English statute passed after the usual reception dates. Do not apply it in a Nigerian problem unless you have verified that the relevant state still uses it as a statute of general application or has its own equivalent. Say that verification is required.",
      ], {
        simple: "If an outside event destroys the point of the contract, and nobody caused it, the contract can die automatically. Mere extra cost is not enough.",
        authorities: [
          {
            name: "Taylor v Caldwell",
            cite: "(1863) 3 B & S 826",
            jurisdiction: "England",
            status: "english",
            principle: "Destruction of the subject matter can frustrate the contract.",
          },
          {
            name: "Davis Contractors v Fareham UDC",
            cite: "[1956] AC 696",
            jurisdiction: "England",
            status: "english",
            principle: "Hardship or extra cost is not frustration. The obligation must change radically.",
          },
        ],
      }),
      S("contrast", "Frustration and breach", [
        "Breach is a failure to do what the contract requires, without a lawful excuse. Frustration is an excuse. The same facts cannot usually be both. Decide which one it is before you discuss damages.",
        "A party cannot rely on frustration that their own breach brought about.",
      ]),
    ],
    terms: [
      { term: "Discharge", plain: "The ending of contractual obligations." },
      { term: "Substantial performance", plain: "Performance that is nearly complete, with only minor defects." },
      { term: "Frustration", plain: "Automatic discharge by a radical supervening event." },
      { term: "Force majeure", plain: "A contract clause that allocates the risk of specified events." },
    ],
    summary: [
      "Performance, agreement, breach, and frustration are the four routes.",
      "Substantial performance can earn the price, minus defects.",
      "Frustration requires a radical change, without fault. Expense is not enough.",
      "Do not apply the English Frustrated Contracts Act 1943 unless you have checked the state.",
    ],
    examTips: [
      "Use the word discharge precisely. Students often say “terminated” for every ending.",
      "If a clause covers the event, start with the clause.",
      "Separate money paid before the event from future instalments.",
    ],
    myths: [
      "“Any unexpected event frustrates a contract.” The event must transform the obligation.",
      "“Force majeure and frustration are identical.” One is a clause. The other is a doctrine.",
      "“The 1943 Act always refunds deposits in Nigeria.” That has to be verified.",
    ],
    problem: pDischarge,
  },
  {
    id: "breach",
    num: 11,
    title: "Breach of Contract",
    blurb: "Actual breach, anticipatory breach, election, and mitigation.",
    minutes: 16,
    level: "intermediate",
    objectives: [
      "Define breach and distinguish actual from anticipatory breach.",
      "Explain the innocent party’s election.",
      "Connect the right to terminate to conditions and innominate terms.",
      "Explain mitigation as a limit on damages, not as a duty that creates liability.",
    ],
    prerequisites: ["terms"],
    sections: [
      S("intro", "Beginner-friendly introduction", [
        "Breach is a failure, without a lawful excuse, to perform as the contract requires. Some breaches allow the other party to walk away. All breaches that cause loss allow a claim for damages, subject to the usual limits. Walking away is a choice. It is not automatic for every late payment or late delivery.",
      ], { simple: "Breach means someone did not do what the contract required, and they had no legal excuse." }),
      S("forms", "Forms of breach", [
        "Actual breach happens at the time performance is due: non-performance, late performance where time matters, or defective performance.",
        "Anticipatory breach happens earlier. One party states clearly that they will not perform, or disables themselves from performing. Hochster v De La Tour (1853) 2 E & B 678: a courier was told, before the start date, that he would not be employed. He could sue at once.",
        "The repudiation must be unequivocal. A negotiating position, or a statement that performance may be difficult, is not enough.",
      ], {
        authorities: [
          {
            name: "Hochster v De La Tour",
            cite: "(1853) 2 E & B 678",
            jurisdiction: "England",
            status: "english",
            principle: "The innocent party may accept an anticipatory repudiation and sue immediately.",
          },
        ],
      }),
      S("election", "Election and affirmation", [
        "The innocent party may accept the repudiation, which discharges both sides from future performance and opens a claim for damages, or may affirm the contract and keep it alive.",
        "Affirmation requires that the innocent party still be able to perform, and it should be communicated. Once they affirm, they cannot later change their mind because of the same repudiation, though a fresh breach will give a new election.",
        "If they affirm, they must stay ready to perform. White and Carter (Councils) Ltd v McGregor [1962] AC 413 is the difficult English case where the innocent party completed performance after repudiation and claimed the price. It is exceptional, and it does not remove the duty to mitigate where mitigation is possible. Use it carefully.",
        "The right to terminate for an actual breach depends on Module 7. Breach of a condition, or a serious breach of an innominate term, gives the right. Breach of a warranty does not.",
      ]),
      S("effects", "Consequences, causation, mitigation", [
        "Ending the contract does not erase accrued rights. Instalments already earned can still be claimed. Exclusion clauses that were part of the contract may still limit damages, subject to construction.",
        "The claimant must prove that the breach caused the loss. A loss that would have happened anyway is not recoverable.",
        "Mitigation: the claimant cannot recover loss that they could reasonably have avoided. This is a limit on damages. It is not a duty that lets the defendant sue. Buying a reasonable substitute, or stopping work that would increase loss, is ordinary mitigation. The claimant need not take a risky or humiliating course.",
      ]),
      S("nigeria", "Nigerian relevance and a local illustration", [
        "Hypothetical. A Lagos fabric supplier emails a fashion house in April: “We cancel the June aso-ebi order. Do not expect delivery.” That is an anticipatory breach if the order was a concluded contract. The fashion house may cover by buying elsewhere and claim the difference, or may affirm if it has a good reason to hold the supplier to June. It should not do both.",
        "Nigerian courts apply these common-law rules. There is no separate federal code of breach.",
      ]),
    ],
    terms: [
      { term: "Actual breach", plain: "A failure when performance is due." },
      { term: "Anticipatory breach", plain: "A clear refusal before performance is due." },
      { term: "Repudiation", plain: "A refusal to be bound by the contract." },
      { term: "Affirmation", plain: "Choosing to keep the contract alive after a repudiation." },
      { term: "Mitigation", plain: "Taking reasonable steps to limit loss." },
    ],
    summary: [
      "Breach is an unexcused failure to perform.",
      "Anticipatory breach allows an immediate election: accept and sue, or affirm.",
      "Only serious breaches give a right to terminate.",
      "Mitigation reduces the damages. It is not a separate lawsuit against the claimant.",
    ],
    examTips: [
      "Quote the words that are said to be a repudiation. “Unequivocal” is a fact conclusion, not a decoration.",
      "State the election expressly.",
      "Do not discuss frustration in the same breath unless the facts raise an outside event.",
    ],
    myths: [
      "“Any breach ends the contract.” Warranties do not.",
      "“The innocent party can ignore a repudiation and also claim cover costs as if they had accepted it.” They must elect.",
      "“Mitigation means the claimant is in breach if they do not mitigate.” It only cuts down their damages.",
    ],
    problem: pBreach,
  },
  {
    id: "remedies",
    num: 12,
    title: "Remedies for Breach",
    blurb: "Damages, remoteness, specific performance, injunctions, and penalties.",
    minutes: 20,
    level: "advanced",
    objectives: [
      "State the aim of compensatory damages.",
      "Apply remoteness and mitigation.",
      "Know when equity will order specific performance or an injunction.",
      "Distinguish liquidated damages from a penalty.",
    ],
    prerequisites: ["breach"],
    sections: [
      S("intro", "Beginner-friendly introduction", [
        "A remedy is what the court can do after a breach. The ordinary remedy is money. Equity sometimes orders a person to do, or not to do, the thing they promised. You choose the remedy that fits the loss, and you never invent a windfall.",
      ], { simple: "Damages are money to put the innocent party where performance would have put them. Court orders to perform are exceptional." }),
      S("damages", "Expectation, reliance, and restitution", [
        "The normal measure is the expectation interest. Robinson v Harman (1848) 1 Ex 850: the claimant is placed, so far as money can do it, in the position they would have been in had the contract been performed. That includes the profit they lost, if it is proved and not too remote.",
        "Reliance damages reimburse wasted expenditure. They are useful where the expected profit is too speculative. A claimant does not stack expectation and reliance for the same loss.",
        "Restitution gives back a benefit conferred on the defendant, so that they are not unjustly enriched. It is not the same as damages for loss.",
        "The claimant must prove the loss. A bare assertion of “millions in profit” is not evidence.",
      ]),
      S("limits", "Remoteness, mitigation, and type of loss", [
        "Hadley v Baxendale (1854) 9 Exch 341 has two limbs. First, loss that arises naturally from the breach in the usual course of things. Second, loss from special circumstances that were communicated to the defendant so that they may fairly be said to have been in the contemplation of both parties.",
        "Victoria Laundry v Newman and The Heron II refine the language of “reasonable contemplation” and degrees of likelihood. You may cite them as English developments of Hadley. The two-limb structure is what examiners want to see applied to facts.",
        "Mitigation, already met in the breach chapter, is applied here as a calculation rule.",
        "Damages for injury to feelings are not generally awarded for commercial contracts. There are limited exceptions where the contract’s purpose is peace of mind or a particular experience. Do not invent a large figure. Non-pecuniary loss must be justified by the type of contract and by authority, not by sympathy alone.",
        "A clause that limits liability is subject to the incorporation and construction rules in the terms chapter.",
      ], {
        authorities: [
          {
            name: "Hadley v Baxendale",
            cite: "(1854) 9 Exch 341",
            jurisdiction: "England",
            status: "english",
            principle: "Damages are limited to loss in the reasonable contemplation of the parties.",
          },
          {
            name: "Robinson v Harman",
            cite: "(1848) 1 Ex 850",
            jurisdiction: "England",
            status: "english",
            principle: "Expectation damages put the claimant in the position of performance.",
          },
        ],
      }),
      S("equity", "Specific performance and injunctions", [
        "Specific performance orders the defendant to perform. It is discretionary. Damages must be inadequate. Unique goods, and contracts for the sale of land, are the strongest cases. It is refused for ordinary goods that can be bought elsewhere, for contracts that need constant supervision, for contracts of personal service, and where the claimant does not come with clean hands or is not ready to perform their own side.",
        "An injunction can restrain a breach of a negative promise. The court will not grant an injunction that indirectly compels personal service.",
        "Both remedies can be refused if money is a full answer.",
      ]),
      S("penalty", "Liquidated damages and penalties", [
        "If the contract names a sum payable on breach, the court asks whether it is a genuine liquidated damages clause or a penalty. A penalty is not enforced. The court awards the actual loss instead, proved in the ordinary way.",
        "Dunlop Pneumatic Tyre Co Ltd v New Garage & Motor Co Ltd [1915] AC 79 set out the older English guidelines. A sum is suspect if it is extravagant compared with the greatest loss that could follow, or if a single sum is payable for both trifling and serious breaches.",
        "Cavendish Square Holding BV v Makdessi [2015] UKSC 67 restated the English test around legitimate interests and whether the clause is out of all proportion. That is a UK Supreme Court decision. Nigerian courts are not bound by it. You may cite it as comparative law and then apply the traditional penalty doctrine unless you have a Nigerian appellate decision that adopts Cavendish. Do not pretend the UK test has been enacted in Nigeria.",
      ]),
      S("other", "Other money remedies", [
        "A quantum meruit claim pays a reasonable sum for work done where there is no fixed price, or where the other party accepted a benefit under a contract that has been discharged in circumstances that leave the work unpaid. It is not a way to escape a bad fixed price while the contract remains in force.",
        "Deposits and part payments are analysed differently. A deposit may be forfeited if the contract says so and it is a true deposit. A part payment is more readily recoverable. Look at the words the parties used.",
      ]),
    ],
    terms: [
      { term: "Expectation loss", plain: "The benefit the claimant expected from performance." },
      { term: "Reliance loss", plain: "Money wasted in reliance on the contract." },
      { term: "Remoteness", plain: "The limit that cuts off unusual losses." },
      { term: "Specific performance", plain: "An order to do what was promised." },
      { term: "Penalty", plain: "A sum that punishes a breach rather than estimating loss." },
    ],
    summary: [
      "Damages protect expectation, subject to proof, remoteness, and mitigation.",
      "Hadley v Baxendale is the remoteness structure.",
      "Specific performance is discretionary and refused where damages are adequate.",
      "Penalties are not enforced. Cite Cavendish only as English comparative law.",
    ],
    examTips: [
      "Calculate, even roughly: contract price, cover price, difference.",
      "Put each head of loss through both limbs of Hadley.",
      "Ask for specific performance only after saying why damages are inadequate.",
    ],
    myths: [
      "“The court always orders the contract to be performed.” Money is the default.",
      "“Every agreed sum is payable.” Penalties are cut down.",
      "“Distress is always claimable.” It usually is not.",
    ],
    problem: pRemedies,
  },
  {
    id: "contexts",
    num: 13,
    title: "Special Contractual Contexts",
    blurb: "Agency, sale of goods, electronic contracts, guarantees, and standard forms.",
    minutes: 18,
    level: "advanced",
    objectives: [
      "Explain how an agent binds a principal.",
      "Identify the statute that may govern a sale of goods.",
      "Analyse an online contract with ordinary formation rules.",
      "Spot a guarantee and its writing requirement without inventing formalities.",
    ],
    prerequisites: ["offer", "acceptance", "terms", "privity"],
    sections: [
      S("intro", "Beginner-friendly introduction", [
        "The rules you have learned are the general law. Some situations add a statute or a special doctrine. This chapter is a map. It tells you which extra question to ask. It is not a substitute for reading the statute your state actually uses.",
      ], { simple: "Special contexts use the same building blocks, plus one extra set of rules. Name that extra set or do not guess it." }),
      S("agency", "Agency", [
        "An agent is a person authorised to affect the principal’s legal relations with third parties. Actual authority is what the principal truly agreed, expressly or by implication from the role. Apparent (or ostensible) authority is what the principal represented to the third party, and the third party relied on. Freeman & Lockyer v Buckhurst Park Properties is the English illustration of apparent authority arising from allowing someone to act as managing director. It is not a Nigerian decision.",
        "A disclosed principal is the party to the contract. The agent is not, if they acted within authority and did not undertake personal liability. An undisclosed principal may sometimes sue and be sued, subject to limits where the identity of the contracting party was fundamental.",
        "Ratification can authorise an act after it was done, if the agent purported to act for a principal who was then in existence and identifiable, and the principal ratifies within a reasonable time with knowledge of the material facts.",
        "Writing is not generally required to appoint an agent. Particular transactions, especially interests in land, may have their own formalities.",
      ]),
      S("sale", "Sale of goods and consumers", [
        "A contract of sale of goods is a contract by which the seller transfers, or agrees to transfer, property in goods to the buyer for a money consideration called the price. Services are not sales of goods, though a contract can be mixed.",
        "The Sale of Goods Act 1893 may apply as received law. Several states have their own Sale of Goods Laws. Before you cite “section 14” or any other section, open the statute that applies in the state in the problem. The themes you can safely discuss are: when property and risk pass, the duty to deliver and to pay, and implied undertakings as to title, description, and quality where the statute implies them.",
        "Consumer transactions may attract additional state or federal protections. Do not invent a consumer commission procedure. If the question is a contract problem, solve it as a contract problem and add a sentence that a consumer statute may also apply if identified.",
      ]),
      S("electronic", "Electronic and standard-form contracts", [
        "An online contract is still a contract. Look for the offer, the acceptance, and the moment the terms were available. A button that says “Pay” may be the customer’s offer. A button that says “Place order — you are bound by our terms” may be acceptance of the site’s offer. The words control.",
        "The Evidence Act 2011 (as amended) deals with the admissibility of electronic records, including the conditions often taught around section 84. It is an evidence statute. It does not replace offer and acceptance.",
        "There is no single Nigerian equivalent of a comprehensive electronic transactions Act that you should assume in every state. If your course teaches a particular state law or the Cybercrimes Act, use it only for what it actually covers. The Cybercrimes Act is not a general code of contract formation.",
        "Standard forms are construed against the drafter where there is genuine ambiguity, and onerous terms need fair notice. That is the terms chapter applied to websites, waybills, and account-opening packs.",
      ]),
      S("guarantee", "Guarantees and indemnities", [
        "A guarantee is a secondary promise: the guarantor will pay if the principal debtor does not. An indemnity is a primary promise to hold the other party harmless. The difference matters because the received Statute of Frauds requires a guarantee to be evidenced in writing and signed by the guarantor. Confirm that this provision is in force for the state. An oral indemnity may be enforceable where an oral guarantee is not.",
        "The label on the document is not conclusive. Courts look at the substance.",
        "A variation of the principal contract, or a release of the debtor, can discharge a guarantor. That is a technical equitable rule. State it only when the facts show a variation.",
      ]),
      S("public", "Businesses and public bodies", [
        "A contract with a ministry or a local government must still satisfy the ordinary elements, and the officer who signed must have authority. Statutory procedure — tenders, approval, consent — may be a condition of a valid public contract. If the problem mentions a procedure, deal with it. If it does not, do not invent one.",
        "The Land Use Act 1978 controls interests in land. A contract to transfer an interest may be ineffectual if a required consent is absent. Treat that as a property condition, and follow a land-law authority you have actually read.",
      ]),
    ],
    terms: [
      { term: "Actual authority", plain: "Authority the principal really gave." },
      { term: "Apparent authority", plain: "Authority a third party reasonably believes exists because of the principal’s representation." },
      { term: "Guarantee", plain: "A promise to pay if someone else does not." },
      { term: "Indemnity", plain: "A primary promise to cover a loss." },
      { term: "Standard form", plain: "A contract written in advance by one side, with little room to negotiate." },
    ],
    summary: [
      "Agency binds a principal through actual or apparent authority.",
      "Sale of goods adds a statute. Check which one the state uses before numbering sections.",
      "Websites use ordinary offer, acceptance, and incorporation.",
      "Guarantees generally need writing. The 1999 UK third-party statute still does not apply.",
    ],
    examTips: [
      "Name the context in the introduction so the examiner sees you spotted it.",
      "Then use the general rules. Do not abandon offer and acceptance.",
      "A missing section number, honestly flagged, is better than a fictional one.",
    ],
    myths: [
      "“Online contracts are not real contracts.” They are, if the elements are present.",
      "“All agents need a power of attorney.” Ordinary commercial agency does not.",
      "“Guarantee and indemnity are interchangeable words.” The law treats them differently.",
    ],
    problem: pContexts,
  },
  {
    id: "exams",
    num: 14,
    title: "Examination Masterclass",
    blurb: "How to read a problem, write IRAC or FIRAC, and use authorities properly.",
    minutes: 16,
    level: "advanced",
    objectives: [
      "Spot issues in the order the facts raise them.",
      "Separate facts, rules, application, and conclusion.",
      "Use authorities without inventing citations.",
      "Manage time so the conclusion is actually written.",
    ],
    prerequisites: ["introduction"],
    sections: [
      S("intro", "How examiners read", [
        "A problem question is a story with legal forks in it. The examiner is not asking for a chapter summary. They are asking you to identify the forks and take them, using rules and authorities, and to finish with a result.",
        "An essay question is different. It asks you to explain, criticise, or compare. Do not force a fictional client into an essay. Do not write an essay when the question gives you Ada, Tunde, and a generator.",
      ], { simple: "Problem question: decide a dispute. Essay question: discuss a doctrine. Look at the verb and the facts before you write." }),
      S("method", "IRAC and FIRAC", [
        "IRAC is Issue, Rule, Application, Conclusion. FIRAC adds Facts at the start. Some lecturers want FIRAC. Some want IRAC and expect the facts to appear inside the application. Follow the rubric you were given. This app teaches both and does not treat one as the only professional method.",
        "Facts: only the facts that matter, in a few lines. Do not rewrite the question.",
        "Issue: a question, not a topic. “Whether Bose’s reply was a counter-offer” is an issue. “Offer and acceptance” is a topic.",
        "Rule: the principle, then the authority, with its jurisdiction. If the authority is English, say so. If you are not sure of the citation, state the principle and say the report should be confirmed. Never invent a volume or a section.",
        "Application: take each material fact and show why it does or does not satisfy the rule. This is the longest part. A script that states the law and then jumps to “therefore the claimant wins” is an assertion, not an answer.",
        "Conclusion: one or two sentences. Answer the issue you asked. You may say “on balance” if the point is open. Do not hide.",
      ]),
      S("structure", "Structure and time", [
        "Read the question twice. On the second pass, underline names, dates, prices, and words of promise. Draw a one-line timeline if the sequence matters.",
        "List issues in the order a court would face them. Formation before terms. Terms before breach. Breach before the measure of damages. Capacity and illegality can defeat an otherwise perfect contract, so put them where they belong, not in a leftover paragraph.",
        "For a 45-minute question, spend about 8 minutes reading and planning, 30 minutes writing, and 7 minutes checking that every issue has a conclusion. A plan with headings is worth more than a beautiful introduction.",
        "Introduction: one sentence on what the dispute is about and the order you will take the issues. Do not define “contract” for half a page unless the question is about the definition.",
        "Conclusion: a short wrap-up of the results. No new law.",
      ]),
      S("authority", "Using cases and statutes", [
        "A case stands for a principle, not for a mood. State the material facts in one sentence only if the analogy depends on them. Then state the principle. Then apply it to these facts, pointing out any difference.",
        "Nigerian authority comes first if you have it. English authority is persuasive and must be labelled. A comparative statute that was never received should be mentioned only to warn yourself not to apply it.",
        "Avoid these moves: “it is trite law that…” followed by no law; a string of case names with no principle; a quotation you do not understand; a section number you half remember.",
      ]),
      S("writing", "Sentences that score", [
        "Use the parties’ names. “The defendant breached” is weaker than “Peak’s letter of 10 March was an unequivocal refusal to deliver.”",
        "One idea in each sentence. Signpost: “The first issue is… The rule is… On these facts… The conclusion is…”",
        "Deal with the other side. “Bose will argue that she accepted. That fails because she added a free case, which is a counter-offer.”",
        "If something is uncertain — a reception statute, a section of CAMA, the state’s Sale of Goods Law — say what turns on it. Examiners reward controlled doubt. They do not reward invention.",
      ]),
      S("checklist", "Last five minutes", [
        "Does every issue have a conclusion?",
        "Have you applied the law to the dates and the prices?",
        "Have you labelled English cases?",
        "Have you avoided a remedy the facts do not support, such as specific performance of a contract for ordinary cement?",
        "Is the advice clearly not a practising lawyer’s opinion? In an examination you are showing method. On this platform the same limit applies: the materials are for study, not a substitute for advice on a real dispute.",
      ]),
    ],
    terms: [
      { term: "Issue", plain: "The precise legal question the facts raise." },
      { term: "Rule", plain: "The principle and its authority." },
      { term: "Application", plain: "The rule tested against these facts." },
      { term: "Authority", plain: "A case or statute that supports the rule, correctly described." },
    ],
    summary: [
      "Decide whether the question is a problem or an essay.",
      "Use IRAC or FIRAC as your lecturer requires. Issues are questions.",
      "Application is where the marks are.",
      "Label jurisdiction. Do not invent citations. End with an answer.",
    ],
    examTips: [
      "Plan in issues, not in chapters.",
      "A timeline prevents postal-rule disasters.",
      "Write the conclusion even if the clock is cruel. An unfinished “therefore” is how marks are lost.",
    ],
    myths: [
      "“Longer is better.” A page of definitions with no application scores poorly.",
      "“Every case in the course must appear.” Use the cases that decide the issues you have.",
      "“IRAC and FIRAC are different laws.” They are writing structures. The law is the same.",
    ],
    problem: pExam,
  },
];
