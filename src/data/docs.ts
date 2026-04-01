export interface DocMeta {
  slug: string
  title: string
  description: string
}

export const DOCS: DocMeta[] = [
  {
    slug: '00-EXAM-OVERVIEW',
    title: 'Exam Overview',
    description: 'AIP-C01 exam structure, domains, scoring, and what to expect.',
  },
  {
    slug: '01-DOMAIN1-FM-Integration-Data-Compliance',
    title: 'Domain 1: FM Integration, Data & Compliance',
    description: 'Foundation model selection, data ingestion, RAG, fine-tuning, and compliance. (31%)',
  },
  {
    slug: '02-DOMAIN2-Implementation-Integration',
    title: 'Domain 2: Implementation & Integration',
    description: 'Deploying GenAI solutions, APIs, agents, prompt engineering. (26%)',
  },
  {
    slug: '03-DOMAIN3-Safety-Security-Governance',
    title: 'Domain 3: Safety, Security & Governance',
    description: 'Guardrails, IAM, responsible AI, auditing, and compliance. (20%)',
  },
  {
    slug: '04-DOMAIN4-Operational-Efficiency',
    title: 'Domain 4: Operational Efficiency',
    description: 'Cost optimization, monitoring, scaling, and operational best practices. (12%)',
  },
  {
    slug: '05-DOMAIN5-Testing-Validation-Troubleshooting',
    title: 'Domain 5: Testing & Troubleshooting',
    description: 'Evaluating model outputs, A/B testing, debugging and validation. (11%)',
  },
  {
    slug: '06-AWS-SERVICES-CHEATSHEET',
    title: 'AWS Services Cheatsheet',
    description: 'Quick reference for all key AWS AI/ML services on the exam.',
  },
  {
    slug: '07-KEY-CONCEPTS-TECHNOLOGIES',
    title: 'Key Concepts & Technologies',
    description: 'Core GenAI concepts: embeddings, vector stores, agents, prompt patterns.',
  },
  {
    slug: '08-AMAZON-BEDROCK-DEEP-DIVE',
    title: 'Amazon Bedrock Deep Dive',
    description: 'Bedrock APIs, model providers, Knowledge Bases, Agents, and Guardrails.',
  },
  {
    slug: '09-PRACTICE-SCENARIOS',
    title: 'Practice Scenarios',
    description: 'Worked exam-style scenarios with explanations.',
  },
  {
    slug: '10-AWS-GENAI-SERVICES-COMPLETE-GUIDE',
    title: 'AWS GenAI Services Complete Guide',
    description: 'Comprehensive guide to SageMaker, Bedrock, Comprehend, Rekognition, and more.',
  },
  {
    slug: '11-STEP-FUNCTIONS-AND-BUILDING-BLOCK-SERVICES',
    title: 'Step Functions & Building Block Services',
    description: 'Orchestration with Step Functions, Lambda, and supporting AWS services.',
  },
  {
    slug: '12-SECURITY-DEEP-DIVE',
    title: 'Security & Weak Domains Deep Dive',
    description: 'Targeted study guide for D3 Security, D4 Ops, D5 Testing — the most commonly challenging domains.',
  },
]
