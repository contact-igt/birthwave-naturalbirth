import type { LineArtVariant } from "@/components/illustrations/LineArt";

export type ServiceContent = {
  slug: string;
  expertSlug: string;
  title: string;
  shortDescription: string;
  accent: "rose" | "blue" | "coral";
  image?: { src: string; alt: string };
  illustration: LineArtVariant;
  hero: {
    eyebrow: string;
    heading: string;
    intro: string;
  };
  explanation: {
    heading: string;
    body: string;
    points: readonly string[];
  };
  whoItsFor: readonly string[];
  doctorTrust: {
    heading: string;
    body: string;
    bullets: readonly string[];
  };
  approach?: {
    eyebrow: string;
    heading: string;
    body: string;
    items: readonly { title: string; description: string }[];
  };
  connectedCare?: {
    eyebrow?: string;
    heading: string;
    intro?: string;
    cards: readonly {
      title: string;
      description: string;
      href: string;
      ctaText: string;
    }[];
  };
  journey: {
    eyebrow: string;
    heading: string;
    intro: string;
    steps: readonly { title: string; body: string }[];
  };
  faqs: readonly { q: string; a: string }[];
  cta: {
    heading: string;
    body: string;
  };
};

// Content follows the project's healthcare-content-safety rules: no invented
// credentials, success rates, delivery counts, or guaranteed outcomes.
// Hedge language ("assess", "discuss", "may", "individual factors") is used
// deliberately wherever an outcome depends on individual assessment.
export const services: readonly ServiceContent[] = [
  {
    slug: "pregnancy-antenatal-care",
    expertSlug: "santoshi-nandigam",
    title: "Pregnancy & Antenatal Care",
    shortDescription:
      "Routine and high-touch pregnancy care with a clear plan for each trimester.",
    accent: "blue",
    image: {
      src: "/images/birthwave/birthwave-antenatal-movement-coaching.png",
      alt: "Antenatal movement coaching session at Birthwave",
    },
    illustration: "pregnancy",
    hero: {
      eyebrow: "Pregnancy & Antenatal Care",
      heading: "Personalised pregnancy care, from your first visit to birth.",
      intro:
        "Every pregnancy brings different questions, changes and decisions. At Birthwave, your antenatal care combines regular medical guidance with nutrition, movement, birth preparation and continuous support throughout your pregnancy.",
    },
    explanation: {
      heading: "Care that grows with your pregnancy",
      body: "Your needs change as your pregnancy progresses. Your antenatal care is planned around each stage, with time to understand your health, your baby’s development and how you can prepare for the months ahead.",
      points: [
        "Regular Antenatal Consultations — Ongoing consultations to monitor your pregnancy, discuss symptoms and answer questions as they arise.",
        "Scans, Tests & Pregnancy Monitoring — Recommended scans, screenings and tests explained clearly, so you understand what is being checked and why.",
        "Nutrition During Pregnancy — Practical nutritional guidance to support your health and your baby’s development throughout pregnancy.",
        "Movement & Pregnancy Yoga — Appropriate movement, yoga and physical preparation based on your stage of pregnancy and individual needs.",
        "Birth Preparation — Start understanding labour, delivery choices, breathing, movement and birth preferences well before your due date.",
        "Continuous Doctor-Led Care — Your pregnancy history and care plan remain connected as you move from antenatal visits towards birth.",
      ],
    },
    whoItsFor: [],
    doctorTrust: {
      heading: "Your pregnancy care with\nDr. Santoshi Nandigam",
      body: "At Birthwave, pregnancy care is built around continuity, conversation and informed decision-making. Dr. Santoshi works with women through pregnancy and birth, helping them understand their options and prepare for delivery with confidence.",
      bullets: [
        "Clear explanations at every stage",
        "Birth conversations that begin during pregnancy",
        "Care that connects pregnancy, birth and recovery",
      ],
    },
    approach: {
      eyebrow: "The Birthwave Approach",
      heading: "Pregnancy care is more than appointments and scans.",
      body: "Medical care is at the centre of your pregnancy journey, but how you eat, move, prepare, understand your body and feel emotionally also matters.\nBirthwave brings these parts of pregnancy care together around you.",
      items: [
        {
          title: "Pregnancy & medical care",
          description: "Doctor-led antenatal monitoring and guidance.",
        },
        {
          title: "Nutrition",
          description: "Support for changing nutritional needs through pregnancy.",
        },
        {
          title: "Yoga & movement",
          description: "Pregnancy-appropriate movement and physical preparation.",
        },
        {
          title: "Childbirth preparation",
          description: "Understanding labour, birth choices and what to expect.",
        },
        {
          title: "Pelvic health & recovery preparation",
          description: "Preparing the body for birth and the recovery that follows.",
        },
        {
          title: "Lactation preparation",
          description: "Beginning breastfeeding education before your baby arrives.",
        },
      ],
    },
    connectedCare: {
      eyebrow: "Connect Pregnancy to Birth",
      heading: "Thinking about how you want to give birth?",
      intro:
        "Pregnancy is also the time to begin understanding your birth options. Your doctor can discuss what may be appropriate for you as your pregnancy progresses.",
      cards: [
        {
          title: "Normal Delivery",
          description:
            "Understand vaginal birth, preparation for labour and the factors that influence your birth plan.",
          href: "/normal-birth-delivery",
          ctaText: "Explore Normal Delivery",
        },
        {
          title: "Natural Birth",
          description:
            "Learn about Birthwave’s approach to preparation, informed choices, movement and lower-intervention birth where appropriate.",
          href: "/natural-birth",
          ctaText: "Explore Natural Birth",
        },
        {
          title: "VBAC",
          description:
            "Had a previous C-section? Learn how VBAC is assessed and what preparing for a vaginal birth after caesarean can involve.",
          href: "/vbac",
          ctaText: "Explore VBAC",
        },
      ],
    },
    journey: {
      eyebrow: "Pregnancy Journey",
      heading: "What care can look like through your pregnancy",
      intro: "Your care unfolds alongside each stage of your pregnancy.",
      steps: [
        {
          title: "Early Pregnancy",
          body: "Confirming and understanding your pregnancy, reviewing your health history, planning initial tests and scans, and discussing the questions that naturally come with the first few weeks.",
        },
        {
          title: "As Your Pregnancy Progresses",
          body: "Regular consultations, monitoring your health and your baby’s growth, reviewing scans and tests, and supporting nutrition, movement and overall wellbeing.",
        },
        {
          title: "Preparing for Birth",
          body: "As you move closer to delivery, conversations increasingly focus on labour, birth preferences, physical preparation, breastfeeding preparation and what to expect around delivery.",
        },
        {
          title: "Towards Delivery",
          body: "Your doctor reviews how your pregnancy is progressing and discusses the safest and most appropriate birth options with you.",
        },
      ],
    },
    faqs: [
      {
        q: "When should I have my first pregnancy or antenatal appointment?",
        a: "You can contact an obstetrician once you know you are pregnant. Your first antenatal visit helps confirm and understand your pregnancy, review your medical history, discuss any symptoms or concerns, and plan the scans and tests you may need. Starting antenatal care early also gives you time to understand nutrition, activity, medications and what to expect during the different stages of pregnancy.",
      },
      {
        q: "What is antenatal care and why is it important during pregnancy?",
        a: "Antenatal care is the regular medical care and support you receive during pregnancy before your baby is born. It includes check-ups to monitor your health and your baby’s growth, along with appropriate scans, tests and screenings. It is also an opportunity to discuss nutrition, physical activity, pregnancy changes, warning signs, emotional wellbeing and preparation for birth. Regular antenatal care helps your doctor follow how your pregnancy is progressing and identify concerns that may need additional attention.",
      },
      {
        q: "What is the difference between normal delivery and natural birth?",
        a: "Both usually involve giving birth vaginally, but the approach to labour and pain management may be different. Normal delivery generally means vaginal birth and may include medical support or pain-relief options such as an epidural when needed or chosen. Natural birth generally aims to allow labour and vaginal birth to progress with minimal medical intervention and without routine pain-relief medicines where possible and clinically appropriate. Support may include breathing techniques, movement, comfortable positions, relaxation and continuous physical and emotional support. The right approach depends on the mother, baby and how labour progresses, and safety always comes first.",
      },
      {
        q: "When should I start preparing for a normal delivery or natural birth?",
        a: "Birth preparation can begin during pregnancy rather than waiting until labour or the final few weeks. As your pregnancy progresses, preparation can include understanding labour, discussing your birth preferences, staying appropriately active, pregnancy-safe movement or yoga, breathing and relaxation techniques, childbirth education, nutrition and preparing mentally and physically for birth. Preparation can help you feel more informed and confident, but no particular type of delivery can be guaranteed.",
      },
      {
        q: "Can I have a normal delivery after a previous C-section?",
        a: "For some women, a vaginal birth after a previous C-section may be possible. This is known as VBAC — Vaginal Birth After Caesarean. Whether VBAC is appropriate depends on factors such as the reason for your previous C-section, the type of uterine incision, your previous birth history, your current pregnancy and the health of you and your baby. If you are considering VBAC, your obstetrician can review your individual history and discuss the potential benefits, risks and other birth options with you.",
      },
      {
        q: "Does Birthwave provide nutrition, yoga and birth preparation along with antenatal care?",
        a: "Yes. Birthwave’s pregnancy care goes beyond routine antenatal consultations by bringing together medical care with supportive services for pregnancy and birth preparation. Depending on your individual needs, your care may include nutrition guidance, pregnancy yoga and movement, childbirth education, birth preparation, pelvic health support and lactation guidance, alongside your regular antenatal care. This allows different aspects of your pregnancy journey to remain connected rather than being treated separately.",
      },
      {
        q: "What does holistic pregnancy care mean?",
        a: "Holistic pregnancy care means caring for you as a whole person during pregnancy—not only monitoring your baby’s growth or completing routine tests. Alongside medical antenatal care, it considers areas such as nutrition, movement, emotional wellbeing, childbirth preparation, pelvic health and breastfeeding preparation. At Birthwave, the aim is to connect these different aspects of care so that you are supported through pregnancy, preparation for birth and the transition into postpartum recovery and newborn care.",
      },
    ],
    cta: {
      heading: "Start your pregnancy journey with Birthwave",
      body: "Whether you’ve just found out you’re pregnant or you’re looking for continued antenatal care, speak with the Birthwave team about your next appointment.",
    },
  },
  {
    slug: "normal-birth-delivery",
    expertSlug: "santoshi-nandigam",
    title: "Normal Birth & Delivery Care",
    shortDescription:
      "Personalised discussions around birth preferences, eligibility and preparation.",
    accent: "coral",
    image: {
      src: "/images/birthwave/birthwave-birth-position-practice.png",
      alt: "Birthing position practice during a Birthwave childbirth workshop",
    },
    illustration: "birth",
    hero: {
      eyebrow: "Normal Birth & Delivery Care",
      heading: "Birth preparation and clinical flexibility, discussed together.",
      intro:
        "Birth planning, labour guidance and childbirth education — with an honest conversation about what's appropriate for your pregnancy, including when a caesarean may be the right path.",
    },
    explanation: {
      heading: "What birth preparation involves",
      body: "Preparing for a normal birth means discussing preferences early and revisiting them as your pregnancy progresses — always alongside a clear, judgement-free conversation about clinical circumstances.",
      points: [
        "Birth planning conversations that start well before your due date",
        "Childbirth education and labour-preparation guidance",
        "Birth partner support and involvement in preparation",
        "A clear, non-judgemental conversation about caesarean birth when it's the appropriate pathway",
      ],
    },
    whoItsFor: [
      "You're hoping for a normal birth and want a clear preparation plan",
      "You want your birth partner involved in preparation, not just the delivery day",
      "You want to understand labour stages and what to expect at each one",
      "You want an honest conversation about all birth pathways, without pressure either way",
    ],
    doctorTrust: {
      heading: "Preparation, not pressure",
      body: "Every birth is different. Birthwave's approach is to prepare you thoroughly for a normal birth while staying clinically flexible — a caesarean, when appropriate, is never presented as a failure.",
      bullets: [
        "Clear explanations before decisions",
        "Support for sensitive conversations without judgement",
        "Care plans that connect pregnancy, birth and recovery",
      ],
    },
    journey: {
      eyebrow: "From First Question To Follow Up",
      heading: "A simpler care journey, with fewer gaps between steps.",
      intro: "What happens next, not just a list of services.",
      steps: [
        { title: "Discover", body: "Understand what birth preparation looks like." },
        { title: "Book", body: "Choose a time by phone or WhatsApp." },
        { title: "Consult", body: "Discuss preferences with your context already understood." },
        { title: "Continue", body: "Preparation continues through to your birth." },
      ],
    },
    faqs: [
      {
        q: "Can I discuss my birth preferences with the doctor?",
        a: "Yes — birth preferences are discussed as part of your regular antenatal visits, revisited as your pregnancy progresses.",
      },
      {
        q: "Do you offer childbirth education classes?",
        a: "Yes, childbirth education workshops run alongside regular antenatal care.",
      },
      {
        q: "Can my birth partner join preparation sessions?",
        a: "Yes — birth partner involvement is part of how we approach preparation.",
      },
      {
        q: "What if a normal birth isn't appropriate for me?",
        a: "We'll talk through it directly — clinical circumstances are assessed individually, and a caesarean is discussed as an appropriate pathway when needed, not a last resort to avoid mentioning.",
      },
    ],
    cta: {
      heading: "Ready to start birth preparation?",
      body: "Reach out by phone or WhatsApp and we'll help you find a time.",
    },
  },
  {
    slug: "vbac",
    expertSlug: "santoshi-nandigam",
    title: "VBAC (Vaginal Birth After Caesarean)",
    shortDescription:
      "Individual assessment and planning for patients considering VBAC.",
    accent: "rose",
    image: {
      src: "/images/birthwave/birthwave-childbirth-workshop-02.png",
      alt: "Birth preparation workshop group session at Birthwave",
    },
    illustration: "vbac",
    hero: {
      eyebrow: "VBAC — Vaginal Birth After Caesarean",
      heading: "Had a caesarean before? Let's discuss your options for this pregnancy.",
      intro:
        "VBAC isn't right for everyone, and it isn't ruled out for everyone either. We assess your previous birth history and this pregnancy individually, and plan from there.",
    },
    explanation: {
      heading: "What a VBAC conversation covers",
      body: "Whether vaginal birth after a caesarean is appropriate depends on your specific history and this pregnancy — it's assessed individually, not assumed either way. Another caesarean may still be recommended, and that's discussed openly, not as a fallback to avoid.",
      points: [
        "A review of your previous caesarean(s) and the reasons behind them",
        "Assessment of this pregnancy's individual factors",
        "An honest discussion of what VBAC would involve, including monitoring during labour",
        "Planning that stays open to a repeat caesarean if that's the safer path",
      ],
    },
    whoItsFor: [
      "You've had one previous caesarean and want to understand your options this time",
      "You want an individual assessment, not a blanket yes or no",
      "You want to understand what closer monitoring during a VBAC labour involves",
      "You want a doctor who will discuss a repeat caesarean honestly if that's the better path",
    ],
    doctorTrust: {
      heading: "An individual assessment, not a default answer",
      body: "VBAC eligibility depends on factors specific to you — the reason for your previous caesarean, how this pregnancy is progressing, and how labour unfolds if you choose to attempt VBAC. We won't promise an outcome either way.",
      bullets: [
        "Clear explanations before decisions",
        "Care plans that connect your birth history to this pregnancy",
        "Support for sensitive conversations without judgement",
      ],
    },
    journey: {
      eyebrow: "How A Vbac Conversation Unfolds",
      heading: "From your previous birth to a plan for this one.",
      intro: "Every step is based on your individual history — nothing is assumed in advance.",
      steps: [
        {
          title: "Previous caesarean",
          body: "We start with what happened and why, in your own words and your records.",
        },
        {
          title: "Consultation",
          body: "An open conversation about what VBAC would involve for you.",
        },
        {
          title: "Assessment",
          body: "Your history and this pregnancy are assessed together, individually.",
        },
        {
          title: "Planning",
          body: "A plan that stays realistic about both a VBAC and a repeat caesarean.",
        },
        {
          title: "Birth care",
          body: "Closer monitoring through labour, with the plan adjusted as needed.",
        },
      ],
    },
    faqs: [
      {
        q: "Am I automatically eligible for VBAC after one caesarean?",
        a: "No — eligibility depends on individual factors, including why your previous caesarean was needed and how this pregnancy is progressing. It's assessed, not assumed.",
      },
      {
        q: "Is VBAC riskier than a repeat caesarean?",
        a: "Both pathways carry different considerations, which we'll walk through for your specific situation during consultation — this isn't something we generalise.",
      },
      {
        q: "What happens if I start labour and VBAC isn't progressing safely?",
        a: "Labour is monitored closely, and the plan can shift to a caesarean if that becomes the safer option at any point.",
      },
      {
        q: "Can we still plan a repeat caesarean instead?",
        a: "Yes — a repeat caesarean is a valid, openly discussed option if that's what's appropriate or what you prefer.",
      },
    ],
    cta: {
      heading: "Want to talk through your VBAC options?",
      body: "Reach out by phone or WhatsApp — we'll start with your previous birth history.",
    },
  },
  {
    slug: "fertility-preconception",
    expertSlug: "bharathy-kandasamy",
    title: "Fertility & Preconception",
    shortDescription: "Evaluation, counselling and planning before pregnancy.",
    accent: "blue",
    image: {
      src: "/images/birthwave/birthwave-prenatal-workshop.png",
      alt: "Preconception and fertility planning consultation at Birthwave",
    },
    illustration: "fertility",
    hero: {
      eyebrow: "Fertility & Preconception",
      heading: "Planning a pregnancy starts with understanding where you are now.",
      intro:
        "Cycle guidance, preconception evaluation and planning conversations — for anyone thinking about pregnancy, whether you're just starting to plan or have been trying for a while.",
    },
    explanation: {
      heading: "What preconception care covers",
      body: "Preconception evaluation looks at your cycle, general health and any relevant history, so planning conversations are based on your actual situation rather than general advice.",
      points: [
        "Cycle and ovulation guidance",
        "Preconception health evaluation and counselling",
        "Discussion of individual factors that may affect conception timing",
        "A plan for what to monitor once you start trying, or while you continue",
      ],
    },
    whoItsFor: [
      "You're starting to plan a pregnancy and want a preconception check-in",
      "You've been trying for a while and want an individual evaluation",
      "You want cycle guidance that's specific to you, not generic advice",
      "You want a consistent doctor if evaluation leads into pregnancy care",
    ],
    doctorTrust: {
      heading: "Planning conversations, not assumptions",
      body: "Every fertility conversation starts with your individual history and current cycle — evaluation comes before any recommendation.",
      bullets: [
        "Clear explanations before decisions",
        "Individual evaluation rather than general advice",
        "Continuity into pregnancy care if and when that's next",
      ],
    },
    journey: {
      eyebrow: "From First Question To Follow Up",
      heading: "A simpler care journey, with fewer gaps between steps.",
      intro: "What happens next, not just a list of services.",
      steps: [
        { title: "Discover", body: "Understand what preconception evaluation involves." },
        { title: "Book", body: "Choose a time by phone or WhatsApp." },
        { title: "Consult", body: "Discuss your cycle and history with Dr. Bharathy Kandasamy." },
        { title: "Continue", body: "A plan for what's next, reviewed as needed." },
      ],
    },
    faqs: [
      {
        q: "When should I have a preconception check-in?",
        a: "Whenever you start thinking about pregnancy — there's no fixed timeline, and earlier conversations simply give more time to plan.",
      },
      {
        q: "Do you offer cycle tracking guidance?",
        a: "Yes, cycle and ovulation guidance is part of preconception care.",
      },
      {
        q: "What if I've been trying for a while without success?",
        a: "We'll start with an individual evaluation of your cycle and relevant history to understand what to look at next.",
      },
      {
        q: "Does this lead into pregnancy care with the same doctor?",
        a: "Yes — if and when you become pregnant, care continues with the same doctor.",
      },
    ],
    cta: {
      heading: "Ready for a preconception conversation?",
      body: "Reach out by phone or WhatsApp and we'll help you find a time.",
    },
  },
  {
    slug: "vaginismus",
    expertSlug: "adithi-nair",
    title: "Vaginismus & Intimate Wellness",
    shortDescription: "Private, sensitive support for pain, fear and intimacy-related concerns.",
    accent: "rose",
    illustration: "vaginismus",
    hero: {
      eyebrow: "Vaginismus & Intimate Wellness",
      heading: "Private, unhurried support for pain and fear around intimacy.",
      intro:
        "A calm, judgement-free space to discuss vaginismus and related concerns — at a pace that's comfortable for you.",
    },
    explanation: {
      heading: "What this consultation involves",
      body: "Conversations start with listening, not examination — you set the pace, and next steps are only discussed once you feel ready.",
      points: [
        "A private, unhurried first conversation",
        "Discussion of pain, fear or anxiety around intimacy without judgement",
        "An individual plan for next steps, at your pace",
        "Ongoing support rather than a single consultation",
      ],
    },
    whoItsFor: [
      "You experience pain or fear around intimacy and want to talk it through privately",
      "You've found it hard to raise this with a doctor before",
      "You want a plan that moves at your pace, not a fixed protocol",
      "You want ongoing, judgement-free support rather than a one-off visit",
    ],
    doctorTrust: {
      heading: "A judgement-free starting point",
      body: "This is a sensitive area, and the first conversation is designed to be exactly that — a conversation. There's no assumption about what happens next until you're ready to discuss it.",
      bullets: [
        "Support for sensitive conversations without judgement",
        "Clear explanations before decisions",
        "A pace set by you, not a fixed process",
      ],
    },
    journey: {
      eyebrow: "From First Question To Follow Up",
      heading: "A simpler care journey, with fewer gaps between steps.",
      intro: "What happens next, not just a list of services.",
      steps: [
        { title: "Discover", body: "Understand what a first conversation looks like." },
        { title: "Book", body: "Choose a time by phone or WhatsApp, privately." },
        { title: "Consult", body: "A private, unhurried conversation with Dr. Adithi Nair." },
        { title: "Continue", body: "Ongoing support at a pace that's comfortable for you." },
      ],
    },
    faqs: [
      {
        q: "Will my first session be a discussion alone?",
        a: "That depends on your history, comfort and the concerns discussed during the consultation. The first session may include discussion, assessment and, where appropriate, guidance or exercises based on your individual care plan.",
      },
      {
        q: "Can I book privately, without discussing why on the phone?",
        a: "Yes — you can book by phone or WhatsApp without needing to explain the reason in advance.",
      },
      {
        q: "How long does support typically continue?",
        a: "That depends on your individual situation and pace — it's discussed with you rather than following a fixed schedule.",
      },
      {
        q: "Will I be examined at the first visit?",
        a: "Not unless you're ready for that — the pace is set by you.",
      },
    ],
    cta: {
      heading: "Ready to talk, privately?",
      body: "Reach out by phone or WhatsApp — this stays between you and Dr. Adithi Nair.",
    },
  },
  {
    slug: "gynaecology",
    expertSlug: "santoshi-nandigam",
    title: "Gynaecology & Women’s Wellness",
    shortDescription:
      "Care for menstrual, hormonal, PCOS and common gynaecological concerns.",
    accent: "rose",
    illustration: "pregnancy",
    hero: {
      eyebrow: "Gynaecology & Women’s Wellness",
      heading: "Compassionate, doctor-led care for every stage of your health.",
      intro:
        "From routine annual checkups and menstrual health to PCOS, fibroids and menopause guidance — continuous care tailored to your individual needs.",
    },
    explanation: {
      heading: "What Gynaecology & Women’s Wellness covers",
      body: "We provide comprehensive, personalized consultation and evidence-based care for preventive wellness as well as acute and chronic gynaecological conditions.",
      points: [
        "Routine gynaecological checkups and preventive health screening",
        "Evaluation and care for irregular, painful or heavy periods",
        "PCOS management, hormonal balance and metabolic wellness",
        "Pelvic health, infection treatment and perimenopause counselling",
      ],
    },
    whoItsFor: [
      "You're experiencing irregular, painful or unusually heavy periods",
      "You want dedicated evaluation and management for PCOS or hormonal imbalance",
      "You're looking for routine preventive gynaecology checkups with a trusted specialist",
      "You need guidance on pelvic health, contraception or perimenopause",
    ],
    doctorTrust: {
      heading: "Empathetic, doctor-led care",
      body: "Our practice prioritizes active listening, thorough clinical assessment and clear explanations — ensuring you feel comfortable and informed at every step.",
      bullets: [
        "Unhurried, private consultations with experienced specialists",
        "Clear explanations of diagnoses and treatment options",
        "Holistic care connecting medical management with lifestyle wellness",
      ],
    },
    journey: {
      eyebrow: "Your Care Pathway",
      heading: "A clear, supportive journey from initial consult to wellness.",
      intro: "What happens when you consult with our gynaecology team.",
      steps: [
        { title: "Book", body: "Schedule a private consultation by phone or WhatsApp." },
        { title: "Consult", body: "A detailed discussion of your health history and current concerns." },
        { title: "Evaluate", body: "Thorough clinical examination and relevant tests explained clearly." },
        { title: "Care Plan", body: "Personalized treatment and lifestyle guidance tailored to your goals." },
      ],
    },
    faqs: [
      {
        q: "When should I consult a gynaecologist?",
        a: "You should book a visit for routine annual checkups, or if you experience irregular periods, pelvic pain, unusual discharge or hormonal symptoms.",
      },
      {
        q: "Do you offer PCOS evaluation and management?",
        a: "Yes — we provide comprehensive PCOS care including hormonal evaluation, symptom management, lifestyle coaching and fertility support.",
      },
      {
        q: "What should I bring to my first appointment?",
        a: "Bring any recent medical reports, test results, or notes regarding your menstrual cycle and symptoms.",
      },
    ],
    cta: {
      heading: "Ready to schedule your gynaecology consultation?",
      body: "Reach out by phone or WhatsApp and we'll help you find a convenient time.",
    },
  },
  {
    slug: "lactation",
    expertSlug: "sheethal-sathya",
    title: "Lactation & Breastfeeding Support",
    shortDescription:
      "Gentle, expert guidance for baby latching, positioning, milk supply and postpartum feeding.",
    accent: "coral",
    illustration: "newborn",
    hero: {
      eyebrow: "Lactation Support & Feeding Care",
      heading: "Gentle, practical breastfeeding guidance for you and your baby.",
      intro:
        "One-on-one lactation counselling, latch assistance, positioning and milk supply guidance — helping you feel confident and supported in feeding your baby.",
    },
    explanation: {
      heading: "What lactation support covers",
      body: "Feeding your baby is a learning process for both mother and infant. We provide calm, hands-on support to resolve feeding challenges early and comfortably.",
      points: [
        "Latch evaluation and comfortable birthing/feeding positioning",
        "Relief and management for sore nipples, engorgement or pain",
        "Milk supply assessment (addressing low supply or oversupply concerns)",
        "Pumping guidance, express milk storage and return-to-work planning",
      ],
    },
    whoItsFor: [
      "You're expecting and want prenatal breastfeeding preparation",
      "You're experiencing pain or difficulty getting your baby to latch",
      "You have concerns about milk supply or baby's weight gain",
      "You need practical guidance on pumping, storing milk or weaning",
    ],
    doctorTrust: {
      heading: "Certified, compassionate lactation counselling",
      body: "Led by certified lactation counsellors and birth doulas, our care provides patient, non-judgmental guidance tailored to your feeding goals.",
      bullets: [
        "Hands-on, unhurried guidance in a calm environment",
        "Individualized care plans respecting your feeding choices",
        "Continuity of support across your postpartum journey",
      ],
    },
    journey: {
      eyebrow: "Lactation Care Pathway",
      heading: "A supportive pathway from prenatal prep to feeding confidence.",
      intro: "What to expect during a lactation consultation.",
      steps: [
        { title: "Book", body: "Reach out by phone or WhatsApp to request a session." },
        { title: "Assessment", body: "We observe a feed, evaluate latch and positioning, and listen to your concerns." },
        { title: "Guidance", body: "Receive gentle, hands-on adjustments and practical feeding techniques." },
        { title: "Follow-up", body: "Ongoing check-ins to track progress and answer your questions." },
      ],
    },
    faqs: [
      {
        q: "When should I see a lactation consultant?",
        a: "You can consult prenatally to prepare, or anytime after birth if you experience painful feeding, latching difficulty or supply concerns.",
      },
      {
        q: "Can my birth partner join the consultation?",
        a: "Yes! Partners are encouraged to attend so they can learn how to support positioning and feeding at home.",
      },
      {
        q: "Do you help with pumping and milk storage?",
        a: "Yes — we provide complete guidance on flange sizing, pump settings, milk storage safety and bottle introduction.",
      },
    ],
    cta: {
      heading: "Need help with breastfeeding or lactation?",
      body: "Reach out by phone or WhatsApp to book a private consultation with our lactation team.",
    },
  },
  {
    slug: "birth-preparation",
    expertSlug: "sheethal-sathya",
    title: "Birth Preparation & Childbirth Education",
    shortDescription:
      "Comprehensive birth preparation, labour guidance, and birth partner readiness with experienced birth doulas.",
    accent: "coral",
    image: {
      src: "/images/birthwave/birthwave-birth-position-practice.png",
      alt: "Birthing position practice during a Birthwave childbirth workshop",
    },
    illustration: "birth",
    hero: {
      eyebrow: "Birth Preparation & Childbirth Education",
      heading: "Birth preparation designed to help you feel informed and supported.",
      intro:
        "Understand the stages of labour, practice birthing positions, build your birth preferences, and prepare your birth partner with hands-on guidance from certified birth doulas.",
    },
    explanation: {
      heading: "What Birth Preparation covers",
      body: "Thorough birth preparation connects practical labour skills with evidence-based childbirth education so you feel prepared, calm, and confident.",
      points: [
        "Preparing for labour stages, physiology, and comfort techniques",
        "Understanding birth preferences and writing your birth plan",
        "Birth partner preparation and active support roles in labour",
        "Practical preparation: hospital bags, birth environment, and breathing practice",
      ],
    },
    whoItsFor: [
      "You're expecting and want structured birth preparation before your due date",
      "You want your birth partner actively involved and confident during labour",
      "You want to understand birth options, pain management choices, and decision-making",
      "You want practical guidance on labour positions, relaxation, and breathing",
    ],
    doctorTrust: {
      heading: "Certified Doula & Childbirth Educator",
      body: "Led by DONA-certified birth doulas and experienced childbirth educators, our preparation sessions provide calm, evidence-based guidance respecting your birth preferences.",
      bullets: [
        "Hands-on practice of labour positions and comfort techniques",
        "Individualized birth preference planning without judgment",
        "Comprehensive support for both expecting parents",
      ],
    },
    journey: {
      eyebrow: "Your Preparation Journey",
      heading: "A step-by-step path to feeling ready for birth.",
      intro: "What to expect in your birth preparation sessions.",
      steps: [
        { title: "Book", body: "Schedule your birth preparation workshop or 1-on-1 session." },
        { title: "Learn", body: "Understand labour physiology, warning signs, and birth options." },
        { title: "Practice", body: "Hands-on practice of birthing positions, movement, and partner support." },
        { title: "Plan", body: "Finalize your birth preferences document to share with your care team." },
      ],
    },
    faqs: [
      {
        q: "When should we start birth preparation classes?",
        a: "Most parents begin between weeks 28 and 34 of pregnancy, but you can start earlier or take an expedited session closer to your due date.",
      },
      {
        q: "Is birth partner attendance included?",
        a: "Yes — birth partner preparation is a core component of our sessions so they know how to support you effectively.",
      },
      {
        q: "Do you cover both natural birth and medical interventions?",
        a: "Yes, we cover natural comfort techniques as well as pain management options, inductions, and caesarean births so you feel prepared for any path.",
      },
    ],
    cta: {
      heading: "Book a Birth Preparation Session",
      body: "Reach out by phone or WhatsApp to schedule a 1-on-1 session or register for our next group workshop.",
    },
  },
  {
    slug: "postpartum-care",
    expertSlug: "santoshi-nandigam",
    title: "Postpartum Recovery & Care",
    shortDescription:
      "Comprehensive recovery support, pelvic floor guidance, lactation, and emotional well-being after delivery.",
    accent: "rose",
    image: {
      src: "/images/birthwave/birthwave-community-event.png",
      alt: "Postpartum care and recovery support session at Birthwave",
    },
    illustration: "pregnancy",
    hero: {
      eyebrow: "Postpartum Recovery & Care",
      heading: "Care that continues after birth.",
      intro:
        "Comprehensive clinical review, physical recovery guidance, lactation support, and emotional well-being checkups — so your postpartum journey receives the same continuous care as your pregnancy.",
    },
    explanation: {
      heading: "What Postpartum Care covers",
      body: "The postpartum period requires dedicated clinical and supportive care. We bring together medical follow-up, lactation guidance, physical recovery, and emotional support.",
      points: [
        "Postpartum clinical review and wound/healing assessment",
        "Lactation counselling and newborn feeding guidance with Sheethal Sathya",
        "Pelvic floor evaluation, movement, and yoga recovery support with Dr. Amudha Varshini",
        "Postpartum nutrition and emotional well-being support",
      ],
    },
    whoItsFor: [
      "You've recently given birth and want thorough clinical follow-up for physical recovery",
      "You need dedicated support for breastfeeding, latching, or milk supply",
      "You want gentle movement and pelvic recovery guidance tailored to postpartum body",
      "You're seeking a supportive space to discuss postpartum mood, fatigue, or transition to parenthood",
    ],
    doctorTrust: {
      heading: "A continuous postpartum care team",
      body: "Postpartum care at Birthwave is led by Dr. Santoshi Nandigam and integrated with allied specialists in lactation, pelvic health, nutrition, and emotional wellness.",
      bullets: [
        "Thorough medical checkups connecting birth to recovery",
        "Supportive care for physical, emotional, and feeding needs",
        "Direct point of contact for postpartum concerns",
      ],
    },
    journey: {
      eyebrow: "Postpartum Care Journey",
      heading: "From initial recovery checkup to long-term wellness.",
      intro: "What to expect in your postpartum care appointments.",
      steps: [
        { title: "Early Check-in", body: "Lactation and early recovery consultation in the first days post-delivery." },
        { title: "6-Week Review", body: "Comprehensive clinical review, pelvic evaluation, and health check with Dr. Santoshi." },
        { title: "Supportive Care", body: "Postpartum movement with Dr. Amudha Varshini, nutrition guidance, and emotional support." },
        { title: "Ongoing Wellness", body: "Continued support as you navigate baby care and personal well-being." },
      ],
    },
    faqs: [
      {
        q: "When should I schedule my first postpartum checkup?",
        a: "Initial lactation check-ins can happen within the first week after birth, followed by routine clinical reviews at 2 and 6 weeks post-delivery.",
      },
      {
        q: "Is pelvic floor recovery guidance included?",
        a: "Yes — pelvic health assessment and safe postpartum movement guidance are key parts of our recovery care.",
      },
      {
        q: "How do you support postpartum emotional well-being?",
        a: "We provide dedicated emotional well-being check-ins with our supportive care team to address fatigue, anxiety, or postpartum transition.",
      },
    ],
    cta: {
      heading: "Ready for your postpartum consultation?",
      body: "Reach out by phone or WhatsApp to schedule a recovery or lactation checkup.",
    },
  },
  {
    slug: "nutrition-emotional-wellbeing",
    expertSlug: "santoshi-nandigam",
    title: "Nutrition & Emotional Well-being",
    shortDescription:
      "Personalized nutrition planning and compassionate psychological support across pregnancy, postpartum, and general wellness.",
    accent: "blue",
    image: {
      src: "/images/birthwave/birthwave-workshop-facilitator.png",
      alt: "Nutrition and emotional well-being counseling at Birthwave",
    },
    illustration: "fertility",
    hero: {
      eyebrow: "Nutrition & Emotional Well-being",
      heading: "Nourishment for your body, support for your mind.",
      intro:
        "Evidence-based nutrition guidance and empathetic psychological support — empowering your health during preconception, pregnancy, postpartum recovery, and beyond.",
    },
    explanation: {
      heading: "What Nutrition & Emotional Well-being covers",
      body: "Physical health and mental well-being are deeply connected. Our supportive care team provides tailored guidance for nutritional needs and emotional resilience.",
      points: [
        "Trimester-specific pregnancy nutrition and gestational diabetes support",
        "Postpartum recovery nutrition and energy replenishment",
        "Empathetic psychological counselling and emotional support",
        "Mindfulness, stress reduction, and parental transition guidance",
      ],
    },
    whoItsFor: [
      "You want personalized nutrition planning during pregnancy or postpartum",
      "You're seeking psychological support for anxiety, stress, or life transitions",
      "You want holistic lifestyle guidance that supports your clinical medical care",
      "You need specialized dietary advice for PCOS, fertility preparation, or recovery",
    ],
    doctorTrust: {
      heading: "Expert-led supportive care",
      body: "Our nutritionists (Sherene) and emotional well-being specialists (Deepa, M.Sc Psychology & Rakshitha) work closely alongside our clinical team for integrated care.",
      bullets: [
        "Individualized nutrition plans tailored to your food preferences and clinical needs",
        "Confidential, empathetic psychological support sessions",
        "Care plans seamlessly coordinated with your main doctor",
      ],
    },
    journey: {
      eyebrow: "Supportive Care Pathway",
      heading: "A calm, structured pathway to holistic well-being.",
      intro: "What happens during a nutrition or emotional well-being consultation.",
      steps: [
        { title: "Book", body: "Schedule a session via phone or WhatsApp specifying your focus area." },
        { title: "Assess", body: "In-depth review of your dietary habits, lifestyle, or emotional concerns." },
        { title: "Plan", body: "Receive a realistic, personalized nutrition plan or supportive coping strategies." },
        { title: "Follow-up", body: "Regular check-ins to support your progress and adjust guidance as needed." },
      ],
    },
    faqs: [
      {
        q: "Are nutrition plans customized for Indian dietary preferences?",
        a: "Yes — all nutrition guidance is practical, culturally familiar, and adapted to your personal dietary habits and medical requirements.",
      },
      {
        q: "What topics can be discussed in emotional well-being sessions?",
        a: "Sessions provide support for anxiety, birth fear, postpartum mood changes, relationship adjustments, and parental stress.",
      },
      {
        q: "Do I need a referral from an OBGYN?",
        a: "No referral is needed — you can book directly for nutrition or emotional well-being support anytime.",
      },
    ],
    cta: {
      heading: "Talk to the Birthwave Team",
      body: "Reach out by phone or WhatsApp to connect with our nutrition and emotional well-being specialists.",
    },
  },
  {
    slug: "newborn-pediatric-care",
    expertSlug: "deepika-sivathanu",
    title: "Newborn & Pediatric Care",
    shortDescription: "Newborn review, vaccination guidance and continuing pediatric care.",
    accent: "coral",
    image: {
      src: "/images/birthwave/hero2.png",
      alt: "Newborn and pediatric care at The Birth Wave",
    },
    illustration: "newborn",
    hero: {
      eyebrow: "Newborn, Pediatric & Vaccination Care",
      heading: "Continuity from delivery into your baby's early care.",
      intro:
        "Newborn review, vaccination guidance and continuing pediatric care — so your baby's early months aren't a handoff to someone new right after delivery.",
    },
    explanation: {
      heading: "What newborn and pediatric care covers",
      body: "Care continues past delivery, with newborn review and a vaccination schedule discussed clearly as your baby grows.",
      points: [
        "Newborn review following delivery",
        "Vaccination guidance and scheduling",
        "Continuing pediatric check-ins through early months",
        "A direct line back to the same care team for questions",
      ],
    },
    whoItsFor: [
      "You're expecting and want continuity of care after delivery",
      "You want vaccination guidance explained clearly, on schedule",
      "You want newborn concerns addressed by a familiar care team",
      "You're looking for ongoing pediatric check-ins, not a one-time visit",
    ],
    doctorTrust: {
      heading: "Continuity that doesn't stop at delivery",
      body: "Newborn and pediatric care is treated as part of the same care journey as your pregnancy and birth, not a separate handoff.",
      bullets: [
        "Care plans that connect pregnancy, birth and recovery",
        "Clear explanations before decisions",
        "A consistent point of contact for early newborn questions",
      ],
    },
    journey: {
      eyebrow: "From First Question To Follow Up",
      heading: "A simpler care journey, with fewer gaps between steps.",
      intro: "What happens next, not just a list of services.",
      steps: [
        { title: "Discover", body: "Understand what newborn follow-up involves." },
        { title: "Book", body: "Choose a time by phone or WhatsApp." },
        { title: "Consult", body: "Newborn review with your birth history already known." },
        { title: "Continue", body: "Vaccination guidance and ongoing check-ins." },
      ],
    },
    faqs: [
      {
        q: "When is the first newborn review?",
        a: "This is scheduled following delivery — timing is discussed as part of your birth care plan.",
      },
      {
        q: "Do you provide a vaccination schedule?",
        a: "Yes, vaccination guidance and scheduling are part of continuing pediatric care.",
      },
      {
        q: "Can I continue pediatric care with the same team after delivery?",
        a: "Yes — that continuity is a core part of how Birthwave is structured.",
      },
      {
        q: "What if I have questions between scheduled visits?",
        a: "You can reach out by phone or WhatsApp — a consistent point of contact is part of ongoing care.",
      },
    ],
    cta: {
      heading: "Planning ahead for newborn care?",
      body: "Reach out by phone or WhatsApp and we'll help you find a time.",
    },
  },
] as const;

export function getService(slug: string): ServiceContent | undefined {
  return services.find((s) => s.slug === slug);
}

// Concise enquiry-only entries for the Services hub — services without a
// dedicated page yet route to /contact?service=<slug>.
export const supportingServices = [
  { slug: "womens-health", title: "Women's Health & Gynaecology" },
  { slug: "pcos", title: "PCOS" },
  { slug: "postpartum-recovery", title: "Postpartum & Recovery" },
  { slug: "lactation", title: "Lactation Support" },
  { slug: "pregnancy-yoga", title: "Pregnancy Yoga" },
  { slug: "nutrition", title: "Nutrition" },
  { slug: "prenatal-classes", title: "Prenatal Classes" },
  { slug: "birth-preparation", title: "Birth Preparation" },
  { slug: "childbirth-education", title: "Childbirth Education" },
  { slug: "workshops-events", title: "Workshops & Events" },
] as const;

// Lightweight option list for the enquiry form's service dropdown — the
// full service pages plus the Natural Birth hub, which isn't a single
// ServiceContent (it's a hub page with its own bespoke layout).
export const formServiceOptions = [
  ...services.map((s) => ({ slug: s.slug, title: s.title })),
  { slug: "natural-birth", title: "Natural Birth" },
] as const;

export function getFormServiceTitle(slug: string): string | undefined {
  return formServiceOptions.find((s) => s.slug === slug)?.title;
}
