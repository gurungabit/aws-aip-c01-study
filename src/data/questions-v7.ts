import type { Question } from './questions'

// ─── Version 7: RETEST FOCUS — Heavy D3/D4/D5 (Security, Ops, Testing) ───
// Distribution: D3=35, D4=20, D5=20 (all weak domains from first attempt)

export const questionsV7: Question[] = [
  // ─── Domain 3: AI Safety, Security & Governance (35 questions, IDs 1–35) ───
  {
    id: 1,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A financial services company deploys a GenAI chatbot on Amazon Bedrock that answers customer questions about insurance policies. The compliance team requires that all numerical calculations in the FM responses are mathematically verified before being shown to the customer.\n\nWhich Amazon Bedrock Guardrails policy meets this requirement?',
    options: [
      { letter: 'A', text: 'Content Moderation policy configured to filter financial content.' },
      { letter: 'B', text: 'Contextual Grounding Check policy with a high grounding threshold.' },
      { letter: 'C', text: 'Automated Reasoning policy to mathematically verify claims in FM responses.' },
      { letter: 'D', text: 'Denied Topics policy configured to block all financial calculation topics.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> The Automated Reasoning policy in Bedrock Guardrails provides mathematical and logical verification of claims in FM responses with 99%+ accuracy. This is specifically designed for scenarios where numerical correctness must be guaranteed, such as insurance policy calculations.\n\n<strong>A is wrong</strong> because Content Moderation filters harmful content (hate, violence, etc.), not mathematical accuracy.\n\n<strong>B is wrong</strong> because Contextual Grounding checks if responses are grounded in source documents, but does not verify mathematical calculations.\n\n<strong>D is wrong</strong> because blocking all financial calculation topics would prevent the chatbot from fulfilling its primary purpose.'
  },
  {
    id: 2,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A developer builds a GenAI application that uses Amazon Bedrock and a self-hosted open-source LLM on Amazon ECS. The security team requires the same content safety guardrails to be applied consistently across both models.\n\nHow should the developer implement this?',
    options: [
      { letter: 'A', text: 'Create separate guardrail configurations for each model since Bedrock Guardrails only work with Bedrock models.' },
      { letter: 'B', text: 'Use the ApplyGuardrail API to apply the same Bedrock Guardrails to both the Bedrock model and the self-hosted model.' },
      { letter: 'C', text: 'Deploy Amazon Comprehend as a standalone content filter in front of both models.' },
      { letter: 'D', text: 'Implement custom Lambda functions with identical filtering logic for each model.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> The ApplyGuardrail API enables consistent safety across ANY model — Bedrock models, self-hosted models, and third-party models. You define guardrails once and apply them to all models through a single API, ensuring consistent content safety.\n\n<strong>A is wrong</strong> because Bedrock Guardrails are NOT limited to Bedrock models. The ApplyGuardrail API specifically enables cross-model guardrail application.\n\n<strong>C is wrong</strong> because Amazon Comprehend provides PII detection and entity extraction but does not offer the full suite of guardrail capabilities (content moderation, prompt attack detection, topic denial, grounding checks, automated reasoning).\n\n<strong>D is wrong</strong> because building custom Lambda functions duplicates effort and is harder to maintain consistently compared to using the managed ApplyGuardrail API.'
  },
  {
    id: 3,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A healthcare company uses Amazon Bedrock to summarize patient records. The security team requires that all API calls to Bedrock never traverse the public internet and that only the InvokeModel action is allowed through the private connection.\n\nWhich solution meets these requirements?',
    options: [
      { letter: 'A', text: 'Configure an internet gateway in the VPC and use HTTPS for all Bedrock API calls.' },
      { letter: 'B', text: 'Create a VPC interface endpoint for Amazon Bedrock using AWS PrivateLink, and attach a VPC endpoint policy that allows only the bedrock:InvokeModel action.' },
      { letter: 'C', text: 'Use a NAT gateway in a private subnet to route Bedrock traffic through the VPC.' },
      { letter: 'D', text: 'Create an S3 gateway endpoint and route Bedrock API calls through S3.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> A VPC interface endpoint using AWS PrivateLink creates a private connection to Bedrock that never traverses the public internet. A VPC endpoint policy can further restrict which API actions are allowed through the endpoint, limiting it to only bedrock:InvokeModel.\n\n<strong>A is wrong</strong> because an internet gateway routes traffic over the public internet, which violates the requirement.\n\n<strong>C is wrong</strong> because a NAT gateway still routes traffic through the public internet (via the NAT to an internet gateway), just from a private subnet.\n\n<strong>D is wrong</strong> because S3 gateway endpoints are for S3 and DynamoDB only, not for Bedrock API calls.'
  },
  {
    id: 4,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A company\'s GenAI chatbot has been exploited by users who craft prompts that override the system instructions, causing the model to ignore its guidelines and produce unauthorized responses.\n\nWhich combination of services provides the MOST effective defense-in-depth against this attack? (Select the best answer.)',
    options: [
      { letter: 'A', text: 'Enable the Prompt Attack Detection policy in Bedrock Guardrails for input filtering, and add AWS WAF custom rules on the API Gateway to detect known prompt injection patterns.' },
      { letter: 'B', text: 'Increase the Content Moderation filter strength to HIGH for all categories on both input and output.' },
      { letter: 'C', text: 'Use Amazon Comprehend to detect entities in user input and block any requests containing technical terms.' },
      { letter: 'D', text: 'Fine-tune the foundation model on examples of prompt injection attacks so it learns to refuse them.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> This implements defense-in-depth with two layers: AWS WAF provides network-layer filtering to catch known injection patterns before they reach the application, and Bedrock Guardrails Prompt Attack Detection uses ML-based classifiers to detect prompt injection and jailbreak attempts at the application layer. Together they provide comprehensive protection.\n\n<strong>B is wrong</strong> because Content Moderation filters for harmful content categories (hate, violence, sexual, etc.), not for prompt injection attacks. A user could craft a polite prompt injection that passes all content moderation filters.\n\n<strong>C is wrong</strong> because blocking technical terms would create many false positives and does not specifically target prompt injection patterns.\n\n<strong>D is wrong</strong> because fine-tuning for injection resistance is unreliable, expensive, and attackers can find new prompt patterns not in the training data.'
  },
  {
    id: 5,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A developer needs to ensure that a Bedrock-powered customer service application never discusses competitor products, regardless of how users phrase their questions.\n\nWhich Bedrock Guardrails policy should the developer configure?',
    options: [
      { letter: 'A', text: 'Content Moderation policy with custom categories for competitor names.' },
      { letter: 'B', text: 'Denied Topics policy with natural language descriptions of competitor product discussions.' },
      { letter: 'C', text: 'PII Redaction policy configured to treat competitor names as sensitive information.' },
      { letter: 'D', text: 'Contextual Grounding Check policy to only allow responses grounded in company documentation.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> The Denied Topics policy allows you to define topics using natural language descriptions that the guardrail should block. You can define topics like "Discussion of competitor products including [competitor names]" and the guardrail will prevent the FM from engaging with those topics regardless of how users phrase their questions.\n\n<strong>A is wrong</strong> because Content Moderation has predefined categories (hate, violence, sexual, etc.) and does not support custom categories for business-specific topics.\n\n<strong>C is wrong</strong> because PII Redaction is for personally identifiable information (SSN, phone numbers, etc.), not for business terms or competitor names.\n\n<strong>D is wrong</strong> because Contextual Grounding checks if responses are supported by source documents, but the model could still mention competitors in its reasoning even if grounded in company docs.'
  },
  {
    id: 6,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A company stores training data for fine-tuning in Amazon S3. The data governance team needs to identify which S3 buckets contain personally identifiable information (PII) such as Social Security numbers and credit card numbers before the data is used for model training.\n\nWhich AWS service should the team use?',
    options: [
      { letter: 'A', text: 'Amazon Comprehend' },
      { letter: 'B', text: 'Amazon Macie' },
      { letter: 'C', text: 'Amazon Bedrock Guardrails' },
      { letter: 'D', text: 'AWS Glue Data Quality' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Amazon Macie is specifically designed to discover and protect sensitive data stored in Amazon S3. It uses machine learning and pattern matching to identify PII such as Social Security numbers, credit card numbers, and other sensitive data across S3 buckets. It provides an inventory of your S3 data and alerts on sensitive data findings.\n\n<strong>A is wrong</strong> because Amazon Comprehend detects PII in text that is passed to its API in real time, but it does not scan S3 buckets at scale for sensitive data discovery.\n\n<strong>C is wrong</strong> because Bedrock Guardrails filter PII in real-time during FM interactions (input/output), not for scanning stored data in S3.\n\n<strong>D is wrong</strong> because AWS Glue Data Quality validates data quality rules (completeness, uniqueness, freshness) but does not specifically detect PII patterns.'
  },
  {
    id: 7,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A company operates GenAI workloads across 15 AWS accounts. The security team needs to prevent developers in any account from using foundation models in non-approved AWS regions, while still allowing Bedrock access in us-east-1 and eu-west-1.\n\nWhat is the MOST scalable way to enforce this?',
    options: [
      { letter: 'A', text: 'Create IAM policies in each account that deny bedrock:* for non-approved regions.' },
      { letter: 'B', text: 'Use AWS Control Tower with a Service Control Policy (SCP) that restricts bedrock:* actions to us-east-1 and eu-west-1 across the organization.' },
      { letter: 'C', text: 'Configure VPC endpoint policies in each account to only route to approved regions.' },
      { letter: 'D', text: 'Use AWS Config rules to detect and remediate Bedrock usage in non-approved regions.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> AWS Control Tower with Service Control Policies (SCPs) provides centralized, organization-wide governance. An SCP with a condition on aws:RequestedRegion can deny all bedrock:* actions except in us-east-1 and eu-west-1. This applies to all accounts in the organization and cannot be overridden by account-level IAM policies, making it the most scalable approach.\n\n<strong>A is wrong</strong> because managing IAM policies across 15 accounts individually does not scale, and account administrators could modify or remove the policies.\n\n<strong>C is wrong</strong> because VPC endpoint policies control access through the endpoint but do not prevent direct API calls if an account has internet access, and managing endpoints across 15 accounts is operationally complex.\n\n<strong>D is wrong</strong> because AWS Config is detective (after-the-fact), not preventive. The model would already be invoked before Config detects and remediates the violation.'
  },
  {
    id: 8,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A developer is building a GenAI web application where users authenticate and interact with a chatbot powered by Amazon Bedrock. Different user tiers (free and premium) should have access to different foundation models. Free users should only use Claude Haiku, while premium users can use Claude Sonnet.\n\nWhich architecture implements this requirement?',
    options: [
      { letter: 'A', text: 'Use Amazon Cognito User Pools for authentication with user groups (free/premium). Map each group to a different IAM role via Cognito Identity Pool. Scope each role\'s IAM policy to allow bedrock:InvokeModel only for the permitted model ARN.' },
      { letter: 'B', text: 'Use API Gateway API keys to differentiate free and premium users, with usage plans that route to different Lambda functions for each model.' },
      { letter: 'C', text: 'Store user tier information in DynamoDB and check it in a Lambda function before calling Bedrock. Use a single IAM role with access to all models.' },
      { letter: 'D', text: 'Deploy two separate API Gateway endpoints — one for free users and one for premium users — each with hardcoded model selections.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Amazon Cognito provides the full authentication and authorization flow. User Pools handle sign-up/sign-in and user groups. Identity Pools exchange Cognito tokens for temporary AWS credentials (STS) with IAM roles mapped to each group. By scoping the IAM policy on each role to specific Bedrock model ARNs, you enforce model access at the IAM level, which cannot be bypassed by application code.\n\n<strong>B is wrong</strong> because API Gateway API keys are for throttling and usage tracking, not for authentication or fine-grained authorization. They do not provide secure user identity.\n\n<strong>C is wrong</strong> because checking user tier in application code with a single IAM role means the Lambda has access to all models. A bug or exploit could bypass the application-level check, violating least privilege.\n\n<strong>D is wrong</strong> because maintaining two separate API endpoints is operationally complex and does not prevent a free user from calling the premium endpoint unless additional authentication is added.'
  },
  {
    id: 9,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A developer needs to store API keys for an external weather service that is used as a tool by an Amazon Bedrock Agent. The keys must be rotated automatically every 90 days without requiring application changes.\n\nWhich service should the developer use?',
    options: [
      { letter: 'A', text: 'Store the API key in an AWS Systems Manager Parameter Store SecureString parameter.' },
      { letter: 'B', text: 'Store the API key in AWS Secrets Manager with automatic rotation configured.' },
      { letter: 'C', text: 'Store the API key as a Lambda environment variable encrypted with AWS KMS.' },
      { letter: 'D', text: 'Store the API key in the Bedrock Agent\'s action group configuration.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> AWS Secrets Manager is designed for storing and automatically rotating secrets such as API keys. It supports automatic rotation with a configurable schedule (every 90 days) using Lambda rotation functions. The application retrieves the current key at runtime, so rotations happen without code changes.\n\n<strong>A is wrong</strong> because Parameter Store SecureString can store encrypted values but does not have built-in automatic rotation. You would need to build custom rotation logic.\n\n<strong>C is wrong</strong> because Lambda environment variables are set at deployment time. Rotating the key would require redeploying the Lambda function, which is not automatic or seamless.\n\n<strong>D is wrong</strong> because Bedrock Agent action group configurations do not have a built-in secret management or rotation capability.'
  },
  {
    id: 10,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A GenAI application processes customer support emails and generates responses. The application must detect PII in incoming emails in real-time, redact PII before it reaches the foundation model, and also prevent the FM from including PII in generated responses.\n\nWhich combination of services implements this pipeline?',
    options: [
      { letter: 'A', text: 'Amazon Macie for real-time PII detection in emails, and Bedrock Guardrails PII policy on output only.' },
      { letter: 'B', text: 'Amazon Comprehend for real-time PII detection in email text, and Bedrock Guardrails PII Redaction policy on both input and output.' },
      { letter: 'C', text: 'Bedrock Guardrails PII Redaction policy on input only, since the model will not generate PII if it does not receive PII.' },
      { letter: 'D', text: 'AWS Glue Data Quality to scan emails for PII patterns, then Bedrock Guardrails on output.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Amazon Comprehend detects PII entities in text in real-time (API call), making it ideal for processing incoming email content. Bedrock Guardrails PII Redaction policy should be configured on BOTH input (to redact PII before it reaches the FM) and output (to catch any PII the model might generate from its training data). This provides defense-in-depth.\n\n<strong>A is wrong</strong> because Amazon Macie scans S3 buckets for sensitive data — it does not process real-time text input like emails. It is a batch scanning service, not a real-time API.\n\n<strong>C is wrong</strong> because even if PII is redacted from input, the FM could still generate PII from its training data (e.g., fabricating a phone number). Output filtering is essential.\n\n<strong>D is wrong</strong> because AWS Glue Data Quality validates data quality rules in ETL pipelines, not real-time email PII detection.'
  },
  {
    id: 11,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A compliance team needs to audit every interaction with foundation models across the organization, including which users invoked which models, the exact prompts sent, and the full responses received.\n\nWhich combination of AWS services provides this audit capability?',
    options: [
      { letter: 'A', text: 'AWS CloudTrail for API call audit logging, and Amazon Bedrock Model Invocation Logging (to S3) for full request/response content.' },
      { letter: 'B', text: 'Amazon CloudWatch Logs for all Bedrock metrics, and AWS Config for tracking model configuration changes.' },
      { letter: 'C', text: 'AWS CloudTrail alone, since it captures the complete request and response payloads for all Bedrock API calls.' },
      { letter: 'D', text: 'Amazon Bedrock Model Invocation Logging to CloudWatch Logs only, since CloudWatch provides complete audit capability.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> CloudTrail records WHO called WHICH Bedrock API and WHEN (the control plane audit), but it does NOT capture the full prompt and response content. Bedrock Model Invocation Logging must be explicitly enabled and configured to log the complete request/response payloads to S3 (or CloudWatch Logs). Together, they provide the complete audit trail the compliance team needs.\n\n<strong>B is wrong</strong> because CloudWatch Logs alone does not automatically capture Bedrock interactions — you must enable Model Invocation Logging. AWS Config tracks resource configuration changes, not API call content.\n\n<strong>C is wrong</strong> because CloudTrail captures API metadata (caller, timestamp, action) but does NOT include the full prompt/response body of InvokeModel calls.\n\n<strong>D is wrong</strong> because while Model Invocation Logging captures request/response content, it does not provide the broader audit context (IAM principal, source IP, etc.) that CloudTrail provides. Both are needed for complete compliance.'
  },
  {
    id: 12,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A data science team wants to fine-tune a foundation model using data from a centralized data lake. The data lake contains data from multiple business units, and the team should only be able to access columns relevant to their project, excluding salary and SSN columns.\n\nWhich service provides this level of access control?',
    options: [
      { letter: 'A', text: 'Amazon S3 bucket policies with object-level access control.' },
      { letter: 'B', text: 'AWS Lake Formation with column-level security and LF-Tags.' },
      { letter: 'C', text: 'IAM policies with S3 object-level conditions.' },
      { letter: 'D', text: 'Amazon Macie to detect and block access to sensitive columns.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> AWS Lake Formation provides fine-grained access control at the column level. You can use LF-Tags (tag-based access control) to manage permissions at scale — tag sensitive columns like salary and SSN as "restricted" and only grant access to columns tagged as "accessible" for the data science team. This integrates with the AWS Glue Data Catalog for metadata management.\n\n<strong>A is wrong</strong> because S3 bucket policies operate at the object (file) level, not at the column level within files. You cannot restrict access to specific columns using S3 policies.\n\n<strong>C is wrong</strong> because IAM policies with S3 conditions can restrict access to specific objects or prefixes but cannot enforce column-level restrictions within data files.\n\n<strong>D is wrong</strong> because Macie detects sensitive data in S3 but does not enforce access control. It is a detection service, not an authorization service.'
  },
  {
    id: 13,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A developer encrypts sensitive customer data before sending it to Amazon Bedrock for processing. The encryption must happen on the client side before the data leaves the application, and the developer needs a library that handles envelope encryption with AWS KMS.\n\nWhich solution should the developer use?',
    options: [
      { letter: 'A', text: 'AWS KMS Encrypt API to encrypt data directly with a KMS key before calling Bedrock.' },
      { letter: 'B', text: 'AWS Encryption SDK to perform client-side envelope encryption using a KMS key as the master key.' },
      { letter: 'C', text: 'Amazon S3 server-side encryption (SSE-KMS) to encrypt data before it is processed.' },
      { letter: 'D', text: 'TLS 1.2 encryption for data in transit to Bedrock.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> The AWS Encryption SDK provides client-side envelope encryption. It generates a data key, encrypts the data locally, and encrypts the data key with a KMS CMK. This ensures data is encrypted before it leaves the application. The SDK handles all the cryptographic complexity.\n\n<strong>A is wrong</strong> because the KMS Encrypt API has a 4 KB payload limit, making it impractical for encrypting large data. The Encryption SDK uses envelope encryption to handle data of any size.\n\n<strong>C is wrong</strong> because SSE-KMS is server-side encryption for data stored in S3, not client-side encryption before calling Bedrock.\n\n<strong>D is wrong</strong> because TLS encrypts data in transit between the client and AWS, but the data is in plaintext at the application layer. The requirement is for client-side encryption before transmission.'
  },
  {
    id: 14,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A company has deployed a GenAI application and wants to monitor for bias drift — situations where the model\'s outputs become increasingly biased over time toward certain demographics.\n\nWhich approach BEST detects bias drift?',
    options: [
      { letter: 'A', text: 'Use Amazon SageMaker Clarify to run periodic bias evaluations on model outputs, comparing current metrics against baseline fairness benchmarks.' },
      { letter: 'B', text: 'Enable Bedrock Guardrails Content Moderation and monitor the number of blocked responses over time.' },
      { letter: 'C', text: 'Use AWS CloudTrail to audit which users are receiving biased responses.' },
      { letter: 'D', text: 'Deploy Amazon Rekognition to analyze text responses for biased content.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Amazon SageMaker Clarify is specifically designed for bias detection and explainability. Running periodic evaluations against baseline fairness metrics allows you to detect when model outputs drift toward biased patterns over time. This is the purpose-built tool for fairness evaluation.\n\n<strong>B is wrong</strong> because Content Moderation filters for harmful content categories (hate, violence, etc.) but does not specifically measure demographic bias or track bias trends over time.\n\n<strong>C is wrong</strong> because CloudTrail logs API calls (who called what), not the content quality or fairness of responses.\n\n<strong>D is wrong</strong> because Amazon Rekognition is for image and video analysis, not text-based bias detection.'
  },
  {
    id: 15,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A GenAI application uses a RAG architecture with Amazon Bedrock Knowledge Bases. Users report that the chatbot sometimes generates answers that contradict the information in the source documents.\n\nWhich Bedrock Guardrails policy DIRECTLY addresses this issue?',
    options: [
      { letter: 'A', text: 'Automated Reasoning policy' },
      { letter: 'B', text: 'Content Moderation policy' },
      { letter: 'C', text: 'Contextual Grounding Check policy with a high grounding threshold' },
      { letter: 'D', text: 'Prompt Attack Detection policy' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> The Contextual Grounding Check policy validates that FM responses are grounded in the source documents provided as context (from RAG retrieval). Setting a high grounding threshold means responses that contradict or are not supported by the source documents will be blocked. This directly addresses the hallucination/contradiction problem.\n\n<strong>A is wrong</strong> because Automated Reasoning verifies mathematical and logical claims, not whether responses are consistent with source documents.\n\n<strong>B is wrong</strong> because Content Moderation filters harmful content types, not factual accuracy or grounding.\n\n<strong>D is wrong</strong> because Prompt Attack Detection prevents prompt injection and jailbreaks, which is unrelated to response grounding.'
  },
  {
    id: 16,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A company needs to manage access for 200 developers across 10 AWS accounts who work on various GenAI projects using Amazon Bedrock and SageMaker. The company uses Azure AD as their identity provider.\n\nWhich AWS service should be used to manage access centrally?',
    options: [
      { letter: 'A', text: 'Create IAM users in each of the 10 accounts for each developer.' },
      { letter: 'B', text: 'Use IAM Identity Center integrated with Azure AD, with permission sets that define Bedrock and SageMaker access levels.' },
      { letter: 'C', text: 'Use Amazon Cognito User Pools federated with Azure AD in each account.' },
      { letter: 'D', text: 'Create cross-account IAM roles in each account and manage trust policies manually.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> IAM Identity Center (successor to AWS SSO) provides centralized access management across multiple AWS accounts. It integrates with external identity providers like Azure AD, so developers authenticate with their existing corporate credentials. Permission sets define what access level each user/group has in each account, including Bedrock and SageMaker permissions.\n\n<strong>A is wrong</strong> because creating 200 IAM users across 10 accounts (2,000 user accounts) is unmanageable and does not integrate with the existing Azure AD identity provider.\n\n<strong>C is wrong</strong> because Amazon Cognito is designed for application-level user authentication (end-user sign-in), not for managing developer access to AWS accounts and services.\n\n<strong>D is wrong</strong> because manually managing cross-account IAM roles and trust policies for 200 users across 10 accounts does not scale and does not integrate with Azure AD for SSO.'
  },
  {
    id: 17,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A developer needs to document a fine-tuned foundation model\'s intended use cases, known limitations, training data sources, and evaluation results to meet the organization\'s AI governance requirements.\n\nWhich AWS service provides a structured way to capture this information?',
    options: [
      { letter: 'A', text: 'Amazon Bedrock Model Invocation Logging' },
      { letter: 'B', text: 'SageMaker Model Cards' },
      { letter: 'C', text: 'AWS CloudTrail event history' },
      { letter: 'D', text: 'Amazon Bedrock Guardrails configuration' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> SageMaker Model Cards provide a structured format to document model details including intended use cases, known limitations, training data sources, evaluation results, ethical considerations, and fairness analysis. Model Cards are the purpose-built AWS tool for AI governance documentation and can be created programmatically.\n\n<strong>A is wrong</strong> because Model Invocation Logging captures runtime request/response data, not model documentation about intended use and limitations.\n\n<strong>C is wrong</strong> because CloudTrail logs API calls for audit purposes, not model documentation.\n\n<strong>D is wrong</strong> because Guardrails define runtime safety policies, not model documentation about capabilities and limitations.'
  },
  {
    id: 18,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'An organization wants to track the complete lineage of data used in its GenAI pipeline — from raw data ingestion in S3, through ETL transformations, to the final processed data used by a Bedrock Knowledge Base.\n\nWhich service provides automatic data lineage tracking?',
    options: [
      { letter: 'A', text: 'AWS CloudTrail' },
      { letter: 'B', text: 'AWS Glue with Data Catalog' },
      { letter: 'C', text: 'Amazon S3 versioning' },
      { letter: 'D', text: 'Amazon DynamoDB Streams' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> AWS Glue automatically tracks data lineage through its ETL transformations. The Glue Data Catalog serves as a centralized metadata repository that registers data sources, and Glue tracks how data flows through transformations. This provides end-to-end traceability from raw data to processed data.\n\n<strong>A is wrong</strong> because CloudTrail tracks API calls (who did what) but does not track data transformations or data lineage through processing pipelines.\n\n<strong>C is wrong</strong> because S3 versioning tracks changes to individual objects but does not show how data flows through a processing pipeline.\n\n<strong>D is wrong</strong> because DynamoDB Streams capture changes to DynamoDB table items, not data lineage across a multi-service pipeline.'
  },
  {
    id: 19,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A GenAI application exposes an API through Amazon API Gateway. The security team observes automated bots sending thousands of requests per minute, significantly increasing costs due to foundation model invocations.\n\nWhich service should be placed in front of API Gateway to mitigate this?',
    options: [
      { letter: 'A', text: 'Amazon CloudFront with edge caching enabled' },
      { letter: 'B', text: 'AWS WAF with rate-limiting rules and bot control' },
      { letter: 'C', text: 'Amazon Comprehend to analyze request patterns' },
      { letter: 'D', text: 'AWS Shield Advanced for DDoS protection' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> AWS WAF provides rate-limiting rules that can throttle requests per IP address, and Bot Control managed rules that can detect and block automated bot traffic. WAF integrates directly with API Gateway to filter requests before they reach the application and trigger expensive FM invocations.\n\n<strong>A is wrong</strong> because CloudFront caches responses at the edge, which can help with repeated identical requests, but does not specifically block bots or rate-limit abusive traffic patterns.\n\n<strong>C is wrong</strong> because Amazon Comprehend is an NLP service for text analysis, not a network-layer security tool for blocking bots.\n\n<strong>D is wrong</strong> because AWS Shield protects against DDoS attacks (volumetric network-layer attacks), but the scenario describes application-layer bot abuse which is better addressed by WAF rules.'
  },
  {
    id: 20,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A developer wants to verify that IAM policies for a new Bedrock Knowledge Base do not inadvertently grant public access to the underlying S3 bucket containing sensitive documents.\n\nWhich AWS service should the developer use to check this?',
    options: [
      { letter: 'A', text: 'AWS Config' },
      { letter: 'B', text: 'IAM Access Analyzer' },
      { letter: 'C', text: 'Amazon Inspector' },
      { letter: 'D', text: 'AWS Trusted Advisor' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> IAM Access Analyzer specifically identifies resources that are shared with external entities. It analyzes resource-based policies (like S3 bucket policies) and IAM policies to find any configuration that grants access to principals outside your account or organization. It will flag if the S3 bucket is publicly accessible.\n\n<strong>A is wrong</strong> because AWS Config tracks resource configuration history and compliance with rules, but IAM Access Analyzer is the purpose-built tool for finding external access grants.\n\n<strong>C is wrong</strong> because Amazon Inspector scans for software vulnerabilities in EC2 instances, Lambda functions, and container images, not IAM policy analysis.\n\n<strong>D is wrong</strong> because Trusted Advisor provides general best-practice recommendations, but IAM Access Analyzer provides deeper, policy-level analysis of external access.'
  },
  {
    id: 21,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: true,
    text: 'A company is implementing a defense-in-depth security architecture for its GenAI chatbot. The architecture must include protection at the network layer, the application layer, and the data layer.\n\nWhich THREE services address each of these layers respectively? (Select THREE.)',
    options: [
      { letter: 'A', text: 'AWS WAF for network-layer request filtering and rate limiting' },
      { letter: 'B', text: 'Amazon Bedrock Guardrails for application-layer content safety and prompt attack detection' },
      { letter: 'C', text: 'AWS KMS for data-layer encryption of sensitive data at rest' },
      { letter: 'D', text: 'Amazon QuickSight for data visualization of security events' }
    ],
    correct: ['A', 'B', 'C'],
    explanation: '<strong>A, B, C are correct.</strong> This is a textbook defense-in-depth architecture:\n\n<strong>A (Network layer):</strong> AWS WAF sits at the edge and filters requests before they reach the application — rate limiting, IP blocking, bot control, and custom rules.\n\n<strong>B (Application layer):</strong> Bedrock Guardrails provide content moderation, prompt attack detection, PII redaction, topic denial, and grounding checks at the FM interaction level.\n\n<strong>C (Data layer):</strong> AWS KMS provides encryption key management for data at rest, ensuring sensitive data stored in S3, DynamoDB, and other services is encrypted.\n\n<strong>D is wrong</strong> because Amazon QuickSight is a business intelligence visualization tool, not a security service.'
  },
  {
    id: 22,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A GenAI application must ensure that the Bedrock Guardrails PII Redaction policy anonymizes Social Security numbers in user input before the input reaches the foundation model, rather than blocking the entire request.\n\nHow should the developer configure the PII Redaction policy?',
    options: [
      { letter: 'A', text: 'Set the action for SSN entity type to BLOCK.' },
      { letter: 'B', text: 'Set the action for SSN entity type to ANONYMIZE.' },
      { letter: 'C', text: 'Use a custom regex pattern to match SSN format and set action to BLOCK.' },
      { letter: 'D', text: 'Enable Content Moderation with a custom SSN category.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> The Bedrock Guardrails PII Redaction policy supports two actions per entity type: BLOCK (rejects the entire request) and ANONYMIZE (replaces the PII with a placeholder like [SSN] and allows the request to proceed). Setting ANONYMIZE for the SSN entity type replaces the SSN with a placeholder before the input reaches the FM.\n\n<strong>A is wrong</strong> because BLOCK rejects the entire request, which is not what the requirement asks for. The request should proceed with the SSN anonymized.\n\n<strong>C is wrong</strong> because while custom regex patterns can be used to match PII, setting the action to BLOCK would reject the request. The built-in SSN entity type with ANONYMIZE is more appropriate.\n\n<strong>D is wrong</strong> because Content Moderation filters for harmful content categories, not PII detection and anonymization.'
  },
  {
    id: 23,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A company wants to build a RAG application that requires the fastest possible vector search with multi-AZ durability for a real-time trading assistant. The vector store must support single-digit millisecond latency at the highest recall rates.\n\nWhich AWS service should be used as the vector store?',
    options: [
      { letter: 'A', text: 'Amazon OpenSearch Serverless' },
      { letter: 'B', text: 'Amazon Aurora with pgvector extension' },
      { letter: 'C', text: 'Amazon MemoryDB' },
      { letter: 'D', text: 'Amazon Neptune' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> Amazon MemoryDB provides the fastest vector search performance on AWS with single-digit millisecond p99 latency at the highest recall rates. It is Redis-compatible, supports HNSW indexing with configurable distance metrics (cosine, euclidean, dot product), and provides multi-AZ durability with a transaction log. This makes it ideal for real-time, latency-sensitive applications like trading assistants.\n\n<strong>A is wrong</strong> because OpenSearch Serverless provides excellent vector search with hybrid search capabilities, but its latency is higher than MemoryDB for pure vector search use cases.\n\n<strong>B is wrong</strong> because Aurora pgvector provides vector search within a relational database context, but its latency is not as low as an in-memory solution like MemoryDB.\n\n<strong>D is wrong</strong> because Amazon Neptune is a graph database optimized for relationship queries (GraphRAG), not for ultra-low-latency vector search.'
  },
  {
    id: 24,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A developer is implementing a GenAI application that uses text-to-SQL to allow users to query a database using natural language. The security team is concerned that the FM-generated SQL could contain destructive queries (DROP TABLE, DELETE, etc.).\n\nWhich approach provides the MOST secure solution?',
    options: [
      { letter: 'A', text: 'Add instructions in the system prompt telling the FM to never generate destructive SQL statements.' },
      { letter: 'B', text: 'Use a Lambda post-processing function to parse the generated SQL, validate it against an allow-list of SQL operations (SELECT only), and use a read-only database user for execution.' },
      { letter: 'C', text: 'Enable Bedrock Guardrails Content Moderation to filter destructive SQL.' },
      { letter: 'D', text: 'Fine-tune the model on examples of safe SQL queries only.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> This implements defense-in-depth with two layers: a Lambda function that parses and validates SQL against an allow-list (deterministic validation), combined with a read-only database user that cannot execute destructive operations even if malicious SQL somehow passes the filter. This is a secure pattern for text-to-SQL.\n\n<strong>A is wrong</strong> because system prompt instructions can be bypassed through prompt injection. You should never rely solely on prompt instructions for security.\n\n<strong>C is wrong</strong> because Content Moderation filters for harmful text content (hate, violence, etc.), not SQL query patterns.\n\n<strong>D is wrong</strong> because fine-tuning does not guarantee the model will never generate destructive SQL, and new prompt patterns could still elicit unsafe queries.'
  },
  {
    id: 25,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'An enterprise deploys a GenAI application on Amazon Bedrock and wants to ensure that all custom model artifacts (from fine-tuning) are encrypted using a customer-managed encryption key that the company fully controls, including key rotation policies.\n\nWhich encryption approach should be used?',
    options: [
      { letter: 'A', text: 'Use AWS-managed KMS keys (aws/bedrock) for encryption at rest.' },
      { letter: 'B', text: 'Use a customer-managed KMS CMK with a key policy granting Bedrock access, and configure annual key rotation.' },
      { letter: 'C', text: 'Use S3 server-side encryption with S3-managed keys (SSE-S3) for the model artifacts.' },
      { letter: 'D', text: 'Encrypt model artifacts using the AWS Encryption SDK before uploading to Bedrock.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> A customer-managed KMS CMK gives the company full control over the encryption key, including who can use it (key policy), key rotation schedules, and the ability to audit key usage via CloudTrail. The key policy must grant Bedrock service principal access to use the key for encryption/decryption operations.\n\n<strong>A is wrong</strong> because AWS-managed keys do not give the company control over key policies or rotation — AWS manages everything. This does not meet the requirement for full company control.\n\n<strong>C is wrong</strong> because SSE-S3 uses S3-managed keys that the company has no control over. Additionally, model artifacts in Bedrock are managed by the service, not stored in customer S3 buckets.\n\n<strong>D is wrong</strong> because Bedrock needs to decrypt model artifacts to use them for inference. Client-side encryption would prevent Bedrock from reading the model, making it non-functional.'
  },
  {
    id: 26,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A developer is building a Bedrock Agent that can take actions such as creating support tickets and sending emails. The agent has access to tool definitions for both actions. The developer needs to ensure that the agent can only create tickets and can NEVER send emails in the production environment.\n\nWhat is the MOST secure way to enforce this?',
    options: [
      { letter: 'A', text: 'Remove the email tool from the agent\'s system prompt instructions.' },
      { letter: 'B', text: 'Remove the email tool definition from the agent\'s action group so the model cannot call it.' },
      { letter: 'C', text: 'Add a Bedrock Guardrails Denied Topics policy that blocks email-related discussions.' },
      { letter: 'D', text: 'Use a higher temperature setting so the model is less likely to choose the email tool.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Removing the tool definition from the action group is the most secure approach because if the model does not know the tool exists, it cannot call it. This is an architectural control that cannot be bypassed through prompt manipulation.\n\n<strong>A is wrong</strong> because system prompt instructions can be overridden through prompt injection or creative user prompts. The model could still call the email tool if its definition exists in the action group.\n\n<strong>C is wrong</strong> because Denied Topics blocks conversational topics but does not prevent tool execution. The agent could still invoke the email tool through indirect reasoning.\n\n<strong>D is wrong</strong> because temperature affects randomness in text generation, not tool selection decisions. This provides no security guarantee.'
  },
  {
    id: 27,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A GenAI application uses Amazon Bedrock and stores conversation history in Amazon DynamoDB. Regulation requires that all data at rest is encrypted and that the encryption keys are rotated annually.\n\nWhich encryption configuration meets these requirements with the LEAST operational overhead?',
    options: [
      { letter: 'A', text: 'DynamoDB encryption with an AWS owned key.' },
      { letter: 'B', text: 'DynamoDB encryption with a customer-managed KMS CMK and automatic annual key rotation enabled.' },
      { letter: 'C', text: 'Encrypt data in the Lambda function using the Encryption SDK before writing to DynamoDB.' },
      { letter: 'D', text: 'Use DynamoDB Streams to copy data to an encrypted S3 bucket.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> DynamoDB supports encryption at rest with customer-managed KMS CMKs. Enabling automatic key rotation on the CMK ensures the key material is rotated annually without any operational effort. DynamoDB handles the encryption/decryption transparently.\n\n<strong>A is wrong</strong> because AWS owned keys provide encryption at rest, but you have no control over key rotation schedules and cannot audit key usage, which may not meet the regulatory requirement for controlled annual rotation.\n\n<strong>C is wrong</strong> because client-side encryption with the Encryption SDK adds significant operational overhead — you must manage encryption/decryption in every read/write path and handle key rotation yourself in the application code.\n\n<strong>D is wrong</strong> because this adds unnecessary complexity. DynamoDB natively supports encryption at rest, so copying to S3 for encryption is redundant and operationally expensive.'
  },
  {
    id: 28,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A company\'s GenAI chatbot inadvertently reveals internal system architecture details when users ask certain types of questions. The chatbot discloses information about the Lambda functions, DynamoDB tables, and API endpoints used in the application.\n\nWhich combination of controls should be applied to prevent this?',
    options: [
      { letter: 'A', text: 'Enable Bedrock Guardrails with a Denied Topics policy blocking system architecture discussions, and a Contextual Grounding Check to limit responses to approved knowledge base content.' },
      { letter: 'B', text: 'Fine-tune the model on examples where it refuses to discuss architecture.' },
      { letter: 'C', text: 'Use AWS WAF to block requests containing technical terms like "Lambda" and "DynamoDB".' },
      { letter: 'D', text: 'Increase the Content Moderation filter to HIGH for all categories.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Two complementary guardrails address this: the Denied Topics policy blocks the model from engaging with system architecture topics, and the Contextual Grounding Check ensures responses are limited to the approved knowledge base content, preventing the model from drawing on its training knowledge about the application\'s internal components.\n\n<strong>B is wrong</strong> because fine-tuning is expensive, slow to iterate, and does not guarantee complete prevention of information leakage.\n\n<strong>C is wrong</strong> because blocking technical terms in user input would prevent legitimate questions about technology and create false positives. The issue is with the model\'s output, not the user\'s input.\n\n<strong>D is wrong</strong> because Content Moderation filters for harmful content categories (hate, violence, etc.), not information disclosure about system architecture.'
  },
  {
    id: 29,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A developer needs to implement a GenAI application that stores vector embeddings for real-time semantic search. The application also needs to cache previous FM responses to reduce costs. The cache must be durable (survive node failures) and provide sub-millisecond read latency.\n\nWhich AWS service best serves BOTH as a vector store and a durable semantic cache?',
    options: [
      { letter: 'A', text: 'Amazon ElastiCache for Redis' },
      { letter: 'B', text: 'Amazon MemoryDB' },
      { letter: 'C', text: 'Amazon DynamoDB with DAX' },
      { letter: 'D', text: 'Amazon OpenSearch Serverless' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Amazon MemoryDB is Redis-compatible with built-in vector search AND multi-AZ durability via a transaction log. It serves both use cases: vector search for semantic retrieval AND durable caching of FM responses. Unlike ElastiCache, MemoryDB data survives node failures without data loss, meeting the durability requirement.\n\n<strong>A is wrong</strong> because while ElastiCache for Redis now supports vector search, it is primarily an in-memory cache that can lose data during node failures. It does not provide the same durability guarantee as MemoryDB\'s transaction log.\n\n<strong>C is wrong</strong> because DynamoDB with DAX provides fast caching for DynamoDB queries but does not support vector search natively.\n\n<strong>D is wrong</strong> because OpenSearch Serverless provides excellent vector search but does not provide sub-millisecond latency for caching use cases, and it is not designed as a general-purpose cache.'
  },
  {
    id: 30,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A company wants to implement continuous governance monitoring for its GenAI application. The system must automatically detect when model outputs show bias drift, trigger alerts, and log all policy violations.\n\nWhich combination of services implements this monitoring pipeline?',
    options: [
      { letter: 'A', text: 'SageMaker Clarify for bias detection, CloudWatch alarms for automated alerting, and CloudWatch Logs for policy violation logging.' },
      { letter: 'B', text: 'Amazon Macie for bias scanning, SNS for alerts, and S3 for log storage.' },
      { letter: 'C', text: 'Bedrock Guardrails for bias detection, EventBridge for notifications, and DynamoDB for logging.' },
      { letter: 'D', text: 'AWS Config rules for bias compliance, Lambda for remediation, and CloudTrail for logging.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> SageMaker Clarify is the purpose-built service for bias detection and fairness evaluation. CloudWatch alarms can trigger automated notifications when bias metrics exceed thresholds. CloudWatch Logs provides comprehensive logging for policy violations and governance events. This is the correct monitoring pipeline for bias drift detection.\n\n<strong>B is wrong</strong> because Macie detects sensitive data (PII) in S3, not model output bias.\n\n<strong>C is wrong</strong> because Bedrock Guardrails provide content safety filtering, not statistical bias detection and fairness metrics.\n\n<strong>D is wrong</strong> because AWS Config monitors resource configurations, not model output quality or bias.'
  },
  {
    id: 31,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A developer is configuring Bedrock Guardrails for a customer-facing chatbot. The guardrail must block content across four categories: hate speech, violence, sexual content, and prompt injection. The developer wants different filter strengths: HIGH for hate and violence, MEDIUM for sexual content, and prompt attack detection enabled.\n\nHow many Bedrock Guardrails policies are needed?',
    options: [
      { letter: 'A', text: 'One policy — Content Moderation handles hate, violence, and sexual content with individual strength settings, and Prompt Attack Detection is a separate policy within the same guardrail.' },
      { letter: 'B', text: 'Four separate policies — one for each content category.' },
      { letter: 'C', text: 'Two policies — one Content Moderation policy and one Prompt Attack Detection policy, both within the same guardrail configuration.' },
      { letter: 'D', text: 'Three policies — hate/violence combined, sexual content separate, and prompt attack separate.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> A single Bedrock Guardrails configuration can contain multiple policies. Content Moderation is one policy that covers multiple categories (hate, insults, sexual, violence, misconduct) with individually configurable strength levels. Prompt Attack Detection is a separate policy. Both are configured within the same guardrail. So you need two policies within one guardrail.\n\n<strong>A is wrong</strong> because while the Content Moderation policy handles multiple categories, Prompt Attack Detection is described as a separate policy within the guardrail (two policies total, not one).\n\n<strong>B is wrong</strong> because Content Moderation is a single policy with multiple categories — you do not need separate policies for each content category.\n\n<strong>D is wrong</strong> because hate and violence are individual categories within the single Content Moderation policy, not separate policies.'
  },
  {
    id: 32,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A company operates an AI-powered HR assistant that answers employee questions. The assistant must NEVER provide legal advice, even if employees ask for it. At the same time, the assistant should still be helpful for general HR questions.\n\nWhich Bedrock Guardrails configuration achieves this?',
    options: [
      { letter: 'A', text: 'Content Moderation with HIGH filter strength on all categories.' },
      { letter: 'B', text: 'Denied Topics policy with a natural language definition: "Legal advice, legal interpretations, or recommendations about lawsuits, contracts, or regulatory compliance."' },
      { letter: 'C', text: 'PII Redaction policy to remove any legal terms from user input.' },
      { letter: 'D', text: 'Contextual Grounding Check with a threshold of 1.0 to ensure all responses are from HR documentation only.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> The Denied Topics policy allows you to define specific topics using natural language that the guardrail should block. By defining legal advice as a denied topic, the assistant will refuse to engage with legal questions while still answering general HR questions. This is the precise tool for topic-level restrictions.\n\n<strong>A is wrong</strong> because Content Moderation filters harmful content (hate, violence, etc.), not business-specific topics like legal advice. Setting all categories to HIGH would block legitimate HR conversations that happen to mention conflict or sensitive topics.\n\n<strong>C is wrong</strong> because PII Redaction removes personally identifiable information, not legal terminology.\n\n<strong>D is wrong</strong> because a grounding threshold of 1.0 would block almost all responses since perfect grounding is rarely achieved. This is too restrictive and does not specifically target legal advice.'
  },
  {
    id: 33,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A company has configured an Amazon Bedrock Guardrails with PII redaction. During testing, the team discovers that the guardrail catches standard PII (SSN, email, phone) but misses a company-specific identifier format (e.g., EMP-XXXX-XXXX) that should also be treated as sensitive.\n\nHow should the developer extend the PII detection?',
    options: [
      { letter: 'A', text: 'Add a custom regex pattern (e.g., EMP-\\d{4}-\\d{4}) to the Sensitive Information Filters in the guardrail configuration.' },
      { letter: 'B', text: 'Fine-tune the guardrail model to recognize the company-specific identifier format.' },
      { letter: 'C', text: 'Use a Lambda pre-processing function to detect and replace the pattern before guardrails are applied.' },
      { letter: 'D', text: 'Add the identifier format to the Denied Topics policy.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Bedrock Guardrails PII Redaction supports custom regex patterns in addition to the built-in PII entity types. You can add a regex pattern like EMP-\\d{4}-\\d{4} to match the company-specific identifier format, and configure whether to BLOCK or ANONYMIZE matches.\n\n<strong>B is wrong</strong> because you cannot fine-tune or customize the guardrail detection models directly.\n\n<strong>C is wrong</strong> because while a Lambda function could work, it adds unnecessary complexity when the guardrail natively supports custom regex patterns.\n\n<strong>D is wrong</strong> because Denied Topics blocks conversational topics, not specific text patterns. It would not reliably detect the format EMP-XXXX-XXXX in user input.'
  },
  {
    id: 34,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A GenAI application uses Amazon Bedrock Agents with multiple action groups that connect to external services. The action groups need API keys for authentication with these services. A security audit requires that these credentials are stored securely with automatic rotation and access auditing.\n\nWhat is the recommended approach?',
    options: [
      { letter: 'A', text: 'Store API keys as Lambda environment variables encrypted with the default Lambda encryption key.' },
      { letter: 'B', text: 'Store API keys in AWS Secrets Manager with automatic rotation configured, and retrieve them at runtime from the Lambda functions that implement the action groups. Enable CloudTrail to audit Secrets Manager access.' },
      { letter: 'C', text: 'Hardcode the API keys in the Lambda function code and use AWS CodeCommit to manage version control.' },
      { letter: 'D', text: 'Store API keys in an S3 bucket with server-side encryption and retrieve them at runtime.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> AWS Secrets Manager is the purpose-built service for storing, rotating, and auditing access to secrets. It supports automatic rotation using Lambda rotation functions, and CloudTrail logs all access to secrets for audit purposes. The Lambda functions implementing the agent\'s action groups retrieve the current API key at runtime.\n\n<strong>A is wrong</strong> because Lambda environment variables do not support automatic rotation — changing them requires redeployment. They also cannot be audited for access patterns.\n\n<strong>C is wrong</strong> because hardcoding credentials in code is a severe security anti-pattern. Code repositories should never contain secrets.\n\n<strong>D is wrong</strong> because S3 does not provide automatic secret rotation or dedicated secret management capabilities. Secrets Manager is the purpose-built solution.'
  },
  {
    id: 35,
    domain: 'D3',
    domainName: 'AI Safety, Security & Governance',
    multi: false,
    text: 'A multinational company needs to ensure that its Amazon Bedrock deployment complies with data residency requirements. EU customer data must be processed in EU regions only, and US customer data in US regions only. The company wants to maintain high availability with automatic failover.\n\nWhich approach meets these requirements?',
    options: [
      { letter: 'A', text: 'Use Bedrock Cross-Region Inference and let AWS automatically route requests to the nearest available region.' },
      { letter: 'B', text: 'Deploy separate Bedrock configurations in EU and US regions with application-level routing based on customer location, and use Cross-Region Inference with an inference profile limited to approved regions within each geography.' },
      { letter: 'C', text: 'Use a single US region for all requests and encrypt EU data with a separate KMS key for compliance.' },
      { letter: 'D', text: 'Use Amazon CloudFront to route requests to the nearest edge location, which will automatically forward to the appropriate Bedrock region.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Separate Bedrock configurations per geography with application-level routing ensures data residency compliance. Cross-Region Inference profiles can be configured to only fail over within approved regions (e.g., EU inference profile only routes between eu-west-1 and eu-central-1), providing high availability while maintaining data residency.\n\n<strong>A is wrong</strong> because default Cross-Region Inference may route EU customer data to US regions, violating data residency requirements.\n\n<strong>C is wrong</strong> because processing EU data in a US region violates data residency requirements regardless of the encryption key used.\n\n<strong>D is wrong</strong> because CloudFront routes to edge locations for content delivery but does not enforce data residency for Bedrock API processing.'
  },

  // ─── Domain 4: Operational Efficiency & Optimization (20 questions, IDs 36–55) ───
  {
    id: 36,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A GenAI chatbot receives 10,000 requests per hour, and 80% of requests use the same system prompt (2,000 tokens) with different user messages. The company wants to reduce costs without changing the model or system prompt.\n\nWhich optimization will provide the MOST significant cost reduction?',
    options: [
      { letter: 'A', text: 'Switch to batch inference for all requests.' },
      { letter: 'B', text: 'Enable prompt caching to cache the common 2,000-token system prompt prefix.' },
      { letter: 'C', text: 'Reduce the max_tokens parameter for responses.' },
      { letter: 'D', text: 'Use Amazon CloudFront to cache responses at the edge.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Prompt caching caches common prompt prefixes (like system prompts). Since 80% of 10,000 requests share the same 2,000-token system prompt, caching it saves up to 90% of the cost for those cached tokens. This means roughly 80% x 2,000 tokens x 90% savings per request, which is the most significant reduction.\n\n<strong>A is wrong</strong> because batch inference is for asynchronous workloads and introduces latency. A real-time chatbot cannot use batch inference as users expect immediate responses.\n\n<strong>C is wrong</strong> because reducing max_tokens limits response length but does not reduce input token costs, which dominate when the system prompt is 2,000 tokens.\n\n<strong>D is wrong</strong> because CloudFront caches identical HTTP responses, but chatbot responses vary per user query. The cache hit rate would be very low.'
  },
  {
    id: 37,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A company runs a document summarization service using Amazon Bedrock. The service processes 50,000 documents per day in a batch job that runs overnight. Real-time latency is not required.\n\nWhich Bedrock pricing model is MOST cost-effective?',
    options: [
      { letter: 'A', text: 'On-demand pricing' },
      { letter: 'B', text: 'Provisioned Throughput' },
      { letter: 'C', text: 'Batch inference' },
      { letter: 'D', text: 'Cross-Region Inference' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> Batch inference is up to 50% cheaper than on-demand pricing and is designed for non-real-time workloads. Since the summarization runs overnight and does not require immediate responses, batch inference provides the most cost-effective pricing model.\n\n<strong>A is wrong</strong> because on-demand pricing charges full per-token rates, which is more expensive than batch inference for high-volume workloads that do not need real-time responses.\n\n<strong>B is wrong</strong> because Provisioned Throughput is for predictable, high-volume workloads that need guaranteed capacity and consistent low latency. It requires a commitment and is more expensive than batch inference for non-real-time workloads.\n\n<strong>D is wrong</strong> because Cross-Region Inference is a resilience feature that routes requests to available capacity across regions — it is not a cost optimization pricing model.'
  },
  {
    id: 38,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A GenAI application uses Amazon Bedrock with Claude Sonnet for all requests. Analysis shows that 70% of requests are simple FAQ-type questions, 20% require moderate reasoning, and 10% require complex multi-step analysis. The company wants to reduce costs by 30% while maintaining quality.\n\nWhich approach should the developer implement?',
    options: [
      { letter: 'A', text: 'Fine-tune a smaller model to handle all three types of requests.' },
      { letter: 'B', text: 'Use Bedrock Intelligent Prompt Routing to automatically route queries to the most cost-effective model based on complexity.' },
      { letter: 'C', text: 'Switch all requests to Claude Haiku to reduce per-token costs.' },
      { letter: 'D', text: 'Implement result caching with Amazon ElastiCache to avoid redundant FM calls.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Intelligent Prompt Routing automatically assesses query complexity and routes simple queries to smaller/cheaper models and complex queries to larger/more capable models. This can reduce costs by up to 30% while maintaining quality because the majority (70%) of simple FAQ queries are handled by cheaper models, and only 10% of complex queries use the expensive model.\n\n<strong>A is wrong</strong> because fine-tuning a single smaller model to handle all three complexity levels may degrade quality on complex tasks, and fine-tuning has its own costs.\n\n<strong>C is wrong</strong> because switching ALL requests to Haiku would significantly degrade quality on the 10% of complex multi-step analysis tasks, not meeting the quality requirement.\n\n<strong>D is wrong</strong> because result caching only helps with identical repeat queries. FAQ-type questions may have similar but not identical phrasing, and caching does not help with the cost of non-cached queries.'
  },
  {
    id: 39,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A company wants to deploy a faster, cheaper version of its large foundation model while maintaining 95% of the original model\'s quality. The team has access to the large model\'s outputs for representative queries.\n\nWhich Amazon Bedrock feature should they use?',
    options: [
      { letter: 'A', text: 'Prompt caching' },
      { letter: 'B', text: 'Model Distillation' },
      { letter: 'C', text: 'Cross-Region Inference' },
      { letter: 'D', text: 'Provisioned Throughput' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Model Distillation transfers knowledge from a large "teacher" model to a smaller "student" model by using the teacher\'s outputs as training data. The distilled model can run up to 500% faster and cost 75% less while maintaining a high percentage of the original model\'s quality.\n\n<strong>A is wrong</strong> because prompt caching reduces costs for repeated prompt prefixes but does not create a faster model.\n\n<strong>C is wrong</strong> because Cross-Region Inference improves availability by routing to available capacity across regions, but does not create a smaller/faster model.\n\n<strong>D is wrong</strong> because Provisioned Throughput reserves capacity for consistent performance but does not reduce the model\'s cost per token or create a smaller model.'
  },
  {
    id: 40,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A user-facing GenAI chatbot currently uses synchronous API calls (InvokeModel). Users complain that they have to wait 8-12 seconds before seeing any response.\n\nWhich change will MOST improve the perceived user experience without changing the model?',
    options: [
      { letter: 'A', text: 'Increase the Provisioned Throughput allocation.' },
      { letter: 'B', text: 'Switch to the InvokeModelWithResponseStream API to stream tokens as they are generated.' },
      { letter: 'C', text: 'Add Amazon CloudFront caching in front of the API.' },
      { letter: 'D', text: 'Lower the temperature parameter to reduce generation time.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Response streaming shows tokens to the user as they are generated, dramatically reducing the Time to First Token (TTFT) from 8-12 seconds to typically under 1 second. Users see the response building in real time instead of waiting for the complete response. This is the standard best practice for user-facing GenAI chat applications.\n\n<strong>A is wrong</strong> because Provisioned Throughput provides consistent performance but does not fundamentally change the synchronous wait time for a complete response.\n\n<strong>C is wrong</strong> because CloudFront caches identical responses, but chatbot responses vary per query, making cache hit rates very low.\n\n<strong>D is wrong</strong> because temperature affects output randomness, not generation speed. The total inference time remains similar regardless of temperature.'
  },
  {
    id: 41,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A developer notices that a RAG application has high end-to-end latency. X-Ray traces show that 60% of the total latency comes from the vector database query, and only 20% from the FM invocation.\n\nWhich optimization should the developer prioritize?',
    options: [
      { letter: 'A', text: 'Switch to a smaller foundation model to reduce FM inference latency.' },
      { letter: 'B', text: 'Optimize the vector database by tuning HNSW index parameters, reducing the number of retrieved documents, and adding query preprocessing.' },
      { letter: 'C', text: 'Enable prompt caching to reduce token costs.' },
      { letter: 'D', text: 'Switch from synchronous to streaming FM invocation.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Since 60% of latency comes from the vector database query, optimizing retrieval will have the most impact. Tuning HNSW index parameters (like ef_search), reducing the number of retrieved documents (top-k), and preprocessing queries for better matching will directly address the primary bottleneck identified by X-Ray.\n\n<strong>A is wrong</strong> because FM inference is only 20% of the latency. Switching to a smaller model might save a few seconds but would miss the primary bottleneck.\n\n<strong>C is wrong</strong> because prompt caching reduces cost, not retrieval latency. The bottleneck is in the vector database, not in prompt processing.\n\n<strong>D is wrong</strong> because streaming reduces perceived latency for the FM response portion (20% of total) but does not help with the vector database query (60% of total).'
  },
  {
    id: 42,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A company enables Amazon Bedrock Model Invocation Logging but finds the logs are not appearing in CloudWatch Logs.\n\nWhat is the MOST likely cause?',
    options: [
      { letter: 'A', text: 'Model Invocation Logging is enabled by default and should appear automatically in CloudWatch.' },
      { letter: 'B', text: 'The IAM role used by the Bedrock logging configuration does not have permissions to write to the CloudWatch Logs log group.' },
      { letter: 'C', text: 'CloudWatch Logs does not support Bedrock invocation data.' },
      { letter: 'D', text: 'Model Invocation Logging only works with Provisioned Throughput, not on-demand invocations.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Model Invocation Logging must be explicitly enabled AND requires proper IAM permissions. The service role configured for Bedrock logging needs permissions to create log streams and put log events in the target CloudWatch Logs log group. Missing IAM permissions is the most common cause of logs not appearing.\n\n<strong>A is wrong</strong> because Model Invocation Logging is NOT enabled by default. It must be explicitly configured in the Bedrock console or via API.\n\n<strong>C is wrong</strong> because CloudWatch Logs fully supports Bedrock invocation logging data.\n\n<strong>D is wrong</strong> because Model Invocation Logging works with both on-demand and provisioned throughput invocations.'
  },
  {
    id: 43,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A GenAI application experiences unpredictable traffic spikes during business hours. The team notices throttling errors (ThrottlingException) during peak periods when using on-demand Bedrock.\n\nWhich approach addresses the throttling while optimizing cost?',
    options: [
      { letter: 'A', text: 'Use Provisioned Throughput for the predicted baseline load, and enable Cross-Region Inference to handle overflow traffic on-demand in other regions.' },
      { letter: 'B', text: 'Switch entirely to Provisioned Throughput sized for peak load.' },
      { letter: 'C', text: 'Implement client-side retry with exponential backoff and process all requests on-demand.' },
      { letter: 'D', text: 'Queue all requests in Amazon SQS and process them sequentially.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> This is a hybrid approach: Provisioned Throughput handles the predictable baseline load with guaranteed capacity (no throttling), and Cross-Region Inference handles traffic spikes by routing overflow requests to available capacity in other regions on-demand. This optimizes cost by not over-provisioning for peaks.\n\n<strong>B is wrong</strong> because sizing Provisioned Throughput for peak load wastes money during off-peak hours when the reserved capacity goes unused.\n\n<strong>C is wrong</strong> because retries with backoff handle transient throttling but do not solve sustained throttling during extended peak periods. Users experience degraded latency.\n\n<strong>D is wrong</strong> because sequential processing from SQS would create unacceptable delays for a user-facing application during high traffic.'
  },
  {
    id: 44,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A developer is building a GenAI pipeline with three independent FM calls: sentiment analysis, entity extraction, and summarization. Each call takes about 3 seconds. Currently, the pipeline runs sequentially, taking 9 seconds total.\n\nWhich optimization reduces the total pipeline latency?',
    options: [
      { letter: 'A', text: 'Use prompt caching to speed up each individual call.' },
      { letter: 'B', text: 'Run all three FM calls in parallel using concurrent invocations, reducing total latency to approximately 3 seconds.' },
      { letter: 'C', text: 'Combine all three tasks into a single prompt to make one FM call instead of three.' },
      { letter: 'D', text: 'Switch to a larger model that can process faster.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Since the three FM calls are independent (no data dependencies between them), they can be executed in parallel. Running all three concurrently reduces total latency from 9 seconds (3+3+3 sequential) to approximately 3 seconds (the time of the slowest individual call).\n\n<strong>A is wrong</strong> because prompt caching reduces cost for repeated prefixes but does not significantly reduce per-call latency. Each call would still take approximately 3 seconds.\n\n<strong>C is wrong</strong> because combining three tasks into a single prompt may produce lower quality results for each task and creates a very large prompt. The combined response also needs to be parsed, adding complexity.\n\n<strong>D is wrong</strong> because larger models are generally not faster than smaller models. In fact, they are often slower due to more parameters to process.'
  },
  {
    id: 45,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A team wants to monitor their GenAI application for unexpected cost increases. Last month\'s Bedrock spend was $5,000, but the budget owner wants to be alerted immediately if daily spending patterns suggest the monthly bill will exceed $8,000.\n\nWhich AWS service should be configured?',
    options: [
      { letter: 'A', text: 'AWS Budgets with a monthly budget of $8,000 and alerts at 80% threshold.' },
      { letter: 'B', text: 'AWS Cost Anomaly Detection configured to monitor Bedrock service spend and alert on unusual patterns.' },
      { letter: 'C', text: 'CloudWatch custom metric for token usage with a static alarm threshold.' },
      { letter: 'D', text: 'AWS Cost Explorer scheduled reports sent weekly.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> AWS Cost Anomaly Detection uses machine learning to identify unusual spending patterns. It can detect anomalies in daily spending that suggest costs are trending above normal levels, providing early warning before the monthly bill exceeds budget. It sends alerts as soon as anomalies are detected.\n\n<strong>A is wrong</strong> because AWS Budgets alerts at threshold percentages of actual spend but does not predict future spend based on patterns. It would only alert when $6,400 (80%) is already spent, which may be too late.\n\n<strong>C is wrong</strong> because a static CloudWatch alarm on token usage does not directly correlate to cost (different models have different prices) and does not provide the pattern-based anomaly detection needed.\n\n<strong>D is wrong</strong> because weekly reports are not "immediate" — by the time a weekly report arrives, significant overspend could have already occurred.'
  },
  {
    id: 46,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A developer needs to optimize a GenAI application for different use cases. For a factual Q&A bot, responses should be deterministic and precise. For a creative writing assistant, responses should be varied and creative.\n\nWhich FM parameter configurations should be used?',
    options: [
      { letter: 'A', text: 'Q&A bot: temperature=0, top-p=1.0 | Creative writing: temperature=0, top-p=0.1' },
      { letter: 'B', text: 'Q&A bot: temperature=0 or very low, low top-k | Creative writing: temperature=0.7-1.0, higher top-p' },
      { letter: 'C', text: 'Q&A bot: temperature=1.0, top-k=500 | Creative writing: temperature=0, top-k=1' },
      { letter: 'D', text: 'Both use temperature=0.5 and top-p=0.5 for balanced results.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Temperature controls randomness: 0 = deterministic (always picks the most likely token), 1.0 = maximum randomness. For factual Q&A, low/zero temperature ensures precise, consistent answers. Low top-k restricts the vocabulary pool for more focused responses. For creative writing, higher temperature (0.7-1.0) and higher top-p allow more diverse, creative outputs.\n\n<strong>A is wrong</strong> because using temperature=0 for creative writing would produce deterministic, repetitive text with no creativity.\n\n<strong>C is wrong</strong> because it has the settings reversed — high temperature for Q&A would produce inconsistent factual answers, and temperature=0 for creative writing produces deterministic text.\n\n<strong>D is wrong</strong> because using identical settings for both use cases does not optimize for their different requirements.'
  },
  {
    id: 47,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A compliance team requires an end-to-end view of request flow through a GenAI application, from the API Gateway, through Lambda, to Bedrock, to the Knowledge Base vector store, and back. They need to identify which component introduces the most latency in the pipeline.\n\nWhich AWS service provides this visibility?',
    options: [
      { letter: 'A', text: 'Amazon CloudWatch Logs Insights' },
      { letter: 'B', text: 'AWS X-Ray distributed tracing' },
      { letter: 'C', text: 'AWS CloudTrail event history' },
      { letter: 'D', text: 'Amazon Managed Grafana dashboards' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> AWS X-Ray provides distributed tracing that visualizes the complete request flow across multiple services. It shows a service map with latency for each component (API Gateway, Lambda, Bedrock, Knowledge Base), making it easy to identify which component is the bottleneck. X-Ray traces individual requests end-to-end.\n\n<strong>A is wrong</strong> because CloudWatch Logs Insights queries log data but does not provide request-level distributed tracing or service maps showing the flow between components.\n\n<strong>C is wrong</strong> because CloudTrail logs API calls for audit purposes but does not provide request-level latency tracing between services.\n\n<strong>D is wrong</strong> because Grafana dashboards display metrics but require the underlying data to come from a tracing service like X-Ray. Grafana alone does not trace requests.'
  },
  {
    id: 48,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A company runs a GenAI-powered search application with hybrid search (keyword + vector). Users report that search relevance is poor — the system returns results that match keywords but are semantically irrelevant.\n\nWhich optimization should the developer implement?',
    options: [
      { letter: 'A', text: 'Disable keyword search and use only vector search.' },
      { letter: 'B', text: 'Implement a reranking step that re-orders the combined results by semantic relevance using a cross-encoder model.' },
      { letter: 'C', text: 'Increase the number of results returned (top-k) from the vector search.' },
      { letter: 'D', text: 'Switch to a larger embedding model with higher dimensions.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Reranking uses a cross-encoder model to re-score and re-order the combined results from hybrid search by semantic relevance. This is the standard approach to improve hybrid search quality because cross-encoders evaluate the full query-document pair, providing more accurate relevance scoring than the initial retrieval phase.\n\n<strong>A is wrong</strong> because completely disabling keyword search removes exact-match capabilities that are important for specific terms, technical queries, and named entities.\n\n<strong>C is wrong</strong> because increasing top-k adds more results but does not improve the relevance ranking of existing results. It may even add more noise.\n\n<strong>D is wrong</strong> because the problem is with result ranking after retrieval, not with the embedding quality. A larger embedding model would not fix the keyword-vs-semantic relevance issue.'
  },
  {
    id: 49,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A developer wants to proactively detect if a GenAI API endpoint starts returning degraded responses or becomes unavailable, BEFORE users report issues.\n\nWhich AWS service provides this proactive monitoring capability?',
    options: [
      { letter: 'A', text: 'CloudWatch Synthetics (Canaries) configured to periodically test the GenAI API endpoint and validate response quality.' },
      { letter: 'B', text: 'CloudWatch Logs Insights to analyze historical log patterns.' },
      { letter: 'C', text: 'AWS Config to monitor resource configuration drift.' },
      { letter: 'D', text: 'Amazon EventBridge to capture API Gateway error events.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> CloudWatch Synthetics creates canary scripts (Node.js or Python) that periodically call the GenAI API, validate responses, and alert on failures or quality degradation. This provides proactive monitoring that detects issues before users encounter them.\n\n<strong>B is wrong</strong> because CloudWatch Logs Insights analyzes historical logs after events have occurred. It is reactive, not proactive.\n\n<strong>C is wrong</strong> because AWS Config monitors resource configuration changes, not API endpoint availability or response quality.\n\n<strong>D is wrong</strong> because EventBridge captures events that have already occurred (reactive), while the requirement is to proactively detect issues before users are affected.'
  },
  {
    id: 50,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A GenAI application uses a RAG pipeline with Amazon Bedrock Knowledge Bases. The developer notices that retrieved chunks often contain irrelevant context that dilutes the FM response quality and increases token costs.\n\nWhich optimization addresses both issues?',
    options: [
      { letter: 'A', text: 'Increase the chunk size to include more context per chunk.' },
      { letter: 'B', text: 'Reduce the number of retrieved chunks (top-k), adjust chunking strategy to use semantic chunking with appropriate overlap, and apply context pruning to remove low-relevance passages before sending to the FM.' },
      { letter: 'C', text: 'Switch to a larger foundation model that can handle more context.' },
      { letter: 'D', text: 'Disable the Knowledge Base and rely on the FM\'s built-in knowledge.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> This addresses both quality and cost: reducing top-k limits the number of chunks sent to the FM (fewer tokens = lower cost), semantic chunking creates more coherent chunks with meaningful boundaries, and context pruning removes low-relevance passages before they reach the FM, improving response quality. Together, these optimizations reduce noise in the context and lower token consumption.\n\n<strong>A is wrong</strong> because larger chunks often include MORE irrelevant content, worsening the dilution problem and increasing token costs.\n\n<strong>C is wrong</strong> because a larger model costs more per token and does not solve the problem of irrelevant context being retrieved. The issue is with retrieval quality, not model capacity.\n\n<strong>D is wrong</strong> because disabling the Knowledge Base removes grounding, likely increasing hallucinations.'
  },
  {
    id: 51,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A GenAI application\'s CloudWatch dashboard shows that the average InputTokenCount per request has been steadily increasing over the past month, causing a corresponding increase in costs. The FM model and system prompt have not changed.\n\nWhat is the MOST likely cause?',
    options: [
      { letter: 'A', text: 'The foundation model\'s pricing has increased.' },
      { letter: 'B', text: 'The RAG Knowledge Base is retrieving more and larger documents as the data source grows, increasing the context sent to the FM.' },
      { letter: 'C', text: 'Users are sending shorter queries over time.' },
      { letter: 'D', text: 'CloudWatch is miscounting the tokens.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> As the Knowledge Base data source grows (more documents are added), retrieval queries may return more results or larger chunks, increasing the context window content sent to the FM. This directly increases InputTokenCount per request. This is a common issue in growing RAG applications.\n\n<strong>A is wrong</strong> because pricing changes would not affect InputTokenCount — only cost per token. The metric measures token volume, not cost.\n\n<strong>C is wrong</strong> because shorter user queries would decrease InputTokenCount, not increase it.\n\n<strong>D is wrong</strong> because CloudWatch accurately tracks Bedrock metrics through the service integration.'
  },
  {
    id: 52,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A company needs detailed custom dashboards that show GenAI application performance metrics including token usage trends, model latency percentiles, cost per interaction, and agent tool call patterns.\n\nWhich service should be used for creating these dashboards?',
    options: [
      { letter: 'A', text: 'AWS Cost Explorer' },
      { letter: 'B', text: 'Amazon Managed Grafana with CloudWatch as a data source' },
      { letter: 'C', text: 'Amazon QuickSight' },
      { letter: 'D', text: 'AWS X-Ray analytics' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Amazon Managed Grafana provides highly customizable dashboards and can use CloudWatch as a data source to visualize GenAI-specific metrics like token usage, latency percentiles, custom business metrics, and operational data. It supports complex visualizations, alerting, and is the recommended service for operational dashboards.\n\n<strong>A is wrong</strong> because Cost Explorer shows cost data but does not provide real-time operational metrics like latency percentiles or tool call patterns.\n\n<strong>C is wrong</strong> because QuickSight is a business intelligence tool for data analytics, not real-time operational dashboards. It is better for reporting than monitoring.\n\n<strong>D is wrong</strong> because X-Ray provides request-level traces, not aggregated metric dashboards with trends and percentiles.'
  },
  {
    id: 53,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A Bedrock Agent uses three tools: database query, email sender, and calendar checker. Monitoring shows that the database query tool is called 5x more frequently than expected, often with redundant queries for the same data within a single conversation.\n\nWhich optimization should the developer implement?',
    options: [
      { letter: 'A', text: 'Remove the database query tool to reduce calls.' },
      { letter: 'B', text: 'Improve the tool descriptions to be more precise about when each tool should be used, and implement session-level caching for database query results within a conversation.' },
      { letter: 'C', text: 'Switch to a smaller model that makes fewer tool calls.' },
      { letter: 'D', text: 'Add rate limiting on the database query tool.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Two optimizations address this: better tool descriptions help the agent make more informed decisions about when to use each tool (reducing unnecessary calls), and session-level caching prevents redundant queries for the same data within a conversation. Together, these reduce tool call frequency without impacting functionality.\n\n<strong>A is wrong</strong> because removing the tool would prevent the agent from accessing the database entirely, breaking its functionality.\n\n<strong>C is wrong</strong> because a smaller model may make worse tool selection decisions, potentially increasing errors and unnecessary calls.\n\n<strong>D is wrong</strong> because rate limiting would cause tool calls to fail during legitimate use, not prevent unnecessary calls.'
  },
  {
    id: 54,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A company is choosing between Time to First Token (TTFT) and Inter-Token Latency (ITL) as the primary optimization metric for their user-facing chatbot.\n\nWhich metric should be prioritized and why?',
    options: [
      { letter: 'A', text: 'ITL should be prioritized because users care about how fast complete responses are generated.' },
      { letter: 'B', text: 'TTFT should be prioritized because it determines how quickly users see the first indication that a response is being generated, which has the greatest impact on perceived responsiveness.' },
      { letter: 'C', text: 'Neither — total end-to-end latency is the only metric that matters.' },
      { letter: 'D', text: 'TTFT should be prioritized because it reduces token costs.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> For user-facing chatbots, TTFT (Time to First Token) is the most critical latency metric because it determines how long the user waits before seeing any response. Research shows that users perceive applications as more responsive when they see initial output quickly, even if the total generation time is the same. Streaming responses makes TTFT the key metric for perceived responsiveness.\n\n<strong>A is wrong</strong> because ITL (the time between consecutive tokens during streaming) affects how smoothly text appears but has less impact on the initial perceived responsiveness than TTFT.\n\n<strong>C is wrong</strong> because with streaming, users do not wait for the complete response — they start reading as tokens arrive. TTFT and ITL provide more relevant optimization targets than total latency.\n\n<strong>D is wrong</strong> because TTFT is a latency metric that has no direct relationship to token costs.'
  },
  {
    id: 55,
    domain: 'D4',
    domainName: 'Operational Efficiency & Optimization',
    multi: false,
    text: 'A GenAI application has a steady-state traffic pattern of 1,000 requests per hour with predictable peak periods of 3,000 requests per hour during business hours. The application requires consistent low-latency responses during both normal and peak periods.\n\nWhich Bedrock deployment strategy is MOST cost-effective?',
    options: [
      { letter: 'A', text: 'Use on-demand pricing for all requests.' },
      { letter: 'B', text: 'Use Provisioned Throughput sized for 3,000 requests per hour at all times.' },
      { letter: 'C', text: 'Use Provisioned Throughput for the baseline 1,000 requests/hour and on-demand for overflow during peaks.' },
      { letter: 'D', text: 'Use batch inference during peak hours to queue excess requests.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> A hybrid approach uses Provisioned Throughput for the predictable baseline load (1,000 req/hr, running 24/7) to get guaranteed capacity at a committed rate, and on-demand for the variable peak overflow (up to 2,000 additional req/hr during business hours). This optimizes cost by not over-provisioning for peaks while ensuring consistent latency.\n\n<strong>A is wrong</strong> because on-demand pricing for 1,000+ req/hr steady state is more expensive than committed Provisioned Throughput for the baseline, and may encounter throttling during peaks.\n\n<strong>B is wrong</strong> because sizing for 3,000 req/hr when baseline is 1,000 wastes 2/3 of provisioned capacity during off-peak hours.\n\n<strong>D is wrong</strong> because batch inference introduces latency, which violates the consistent low-latency requirement.'
  },

  // ─── Domain 5: Testing, Validation & Troubleshooting (20 questions, IDs 56–75) ───
  {
    id: 56,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A company needs to evaluate the quality of a GenAI chatbot\'s responses at scale. Human evaluation is too expensive for the volume of responses generated daily. The evaluation must assess helpfulness, correctness, and harmlessness.\n\nWhich evaluation approach should the developer implement?',
    options: [
      { letter: 'A', text: 'Use Amazon Bedrock Model Evaluations with the LLM-as-a-Judge technique, where a capable FM evaluates the chatbot\'s outputs against defined criteria.' },
      { letter: 'B', text: 'Use CloudWatch metrics to count the number of successful API responses.' },
      { letter: 'C', text: 'Calculate BLEU scores by comparing chatbot responses to reference translations.' },
      { letter: 'D', text: 'Monitor user session duration as a proxy for response quality.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> LLM-as-a-Judge uses a capable foundation model (the "judge") to evaluate another model\'s outputs against defined criteria like helpfulness, correctness, and harmlessness. This scales much better than human evaluation while providing nuanced quality assessments. Amazon Bedrock Model Evaluations provides built-in support for this technique.\n\n<strong>B is wrong</strong> because counting successful API responses only measures availability, not response quality. A response can be successful (200 status) but unhelpful or incorrect.\n\n<strong>C is wrong</strong> because BLEU scores are designed for machine translation evaluation, not general chatbot quality. They measure n-gram overlap with reference texts and are not suitable for open-ended conversational quality.\n\n<strong>D is wrong</strong> because session duration is a weak proxy — users may spend a long time because they cannot get good answers, or leave quickly because they got exactly what they needed.'
  },
  {
    id: 57,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A developer needs to evaluate a RAG application\'s retrieval quality separately from its generation quality. The developer suspects that the retrieval step is returning irrelevant documents, even though the FM generates well-formed responses.\n\nWhich evaluation metrics should the developer measure?',
    options: [
      { letter: 'A', text: 'Only measure the final response quality using human evaluators.' },
      { letter: 'B', text: 'Measure retrieval relevance (are the right documents retrieved?), context precision (what % of retrieved context is useful?), and faithfulness (does the response accurately represent the sources?).' },
      { letter: 'C', text: 'Measure only token usage and latency to evaluate the retrieval pipeline.' },
      { letter: 'D', text: 'Compare the FM response against a dictionary of approved answers.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Evaluating RAG requires separating retrieval and generation metrics. Retrieval relevance measures if the right documents are found. Context precision measures what percentage of retrieved content is actually useful (high noise = low precision). Faithfulness measures if the generated response accurately represents the source documents. Together, these metrics pinpoint whether the retrieval or the generation is the weak link.\n\n<strong>A is wrong</strong> because evaluating only the final response does not help identify whether the retrieval or generation step is the problem. You need separate metrics for each component.\n\n<strong>C is wrong</strong> because token usage and latency measure performance, not retrieval quality. A fast retrieval of irrelevant documents still has poor quality.\n\n<strong>D is wrong</strong> because a dictionary of approved answers is too rigid for open-ended RAG responses and does not evaluate retrieval quality.'
  },
  {
    id: 58,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A company deploys a new version of their GenAI application and wants to verify that the update does not degrade response quality compared to the previous version. They have a set of 500 reference question-answer pairs.\n\nWhich testing approach should be used?',
    options: [
      { letter: 'A', text: 'Run all 500 reference questions through the new version and compare responses against the reference answers using semantic similarity scoring and automated quality metrics. Flag any significant regression.' },
      { letter: 'B', text: 'Run a single test question and manually review the response.' },
      { letter: 'C', text: 'Deploy the new version to all users and monitor CloudWatch error rates.' },
      { letter: 'D', text: 'Compare the model parameter configurations between old and new versions.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> This is regression testing for GenAI. Running all 500 reference questions creates a comprehensive comparison between versions. Semantic similarity scoring evaluates whether responses maintain the same quality and correctness, and automated quality metrics flag any significant degradation. This is a systematic approach to deployment validation.\n\n<strong>B is wrong</strong> because a single test question is not statistically significant and could miss regressions in specific domains or question types.\n\n<strong>C is wrong</strong> because deploying to all users without testing risks exposing all users to degraded quality. Error rates alone do not capture quality regression.\n\n<strong>D is wrong</strong> because parameter configuration comparison does not reveal how the actual outputs differ. Two configurations could produce very different quality responses.'
  },
  {
    id: 59,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A GenAI application suddenly starts producing truncated responses that cut off mid-sentence. The model and prompt have not changed. CloudWatch metrics show that OutputTokenCount has decreased while InputTokenCount has increased.\n\nWhat is the MOST likely cause?',
    options: [
      { letter: 'A', text: 'The model\'s context window is being exceeded because input tokens have grown, leaving fewer tokens available for the response within the context window limit.' },
      { letter: 'B', text: 'The model has been degraded by Amazon and produces shorter responses.' },
      { letter: 'C', text: 'The CloudWatch metrics are incorrect.' },
      { letter: 'D', text: 'Network timeouts are causing responses to be cut off.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> This is a classic context window overflow issue. The context window has a fixed size (input + output tokens). As InputTokenCount increases (e.g., due to more RAG context being injected), fewer tokens are available for the output, causing responses to be truncated. The increasing InputTokenCount directly correlates with the decreasing OutputTokenCount.\n\n<strong>B is wrong</strong> because Amazon does not degrade models without notice. Model behavior is consistent for a given model version.\n\n<strong>C is wrong</strong> because CloudWatch accurately reports Bedrock invocation metrics.\n\n<strong>D is wrong</strong> because network timeouts would produce errors, not shortened responses with consistent OutputTokenCount metrics.'
  },
  {
    id: 60,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A developer is deploying a new foundation model version to a production GenAI application. The team wants to gradually shift traffic from the old model to the new model while monitoring for quality degradation.\n\nWhich deployment strategy should be used?',
    options: [
      { letter: 'A', text: 'Blue/green deployment with an immediate 100% cutover.' },
      { letter: 'B', text: 'Canary deployment: route 5-10% of traffic to the new model, monitor quality metrics and golden dataset results, then gradually increase traffic if quality is maintained.' },
      { letter: 'C', text: 'Deploy the new model to a development environment and run unit tests only.' },
      { letter: 'D', text: 'Replace the model in production during a maintenance window.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Canary deployment routes a small percentage of traffic (5-10%) to the new model while the majority continues to use the proven old model. Quality metrics (golden dataset checks, LLM-as-a-Judge, latency, error rates) are monitored. If the new model maintains quality, traffic is gradually increased. If quality degrades, traffic is rolled back. This minimizes risk.\n\n<strong>A is wrong</strong> because an immediate 100% cutover risks exposing all users to potential quality degradation before it can be detected.\n\n<strong>C is wrong</strong> because development testing alone does not validate behavior with real production traffic and data patterns.\n\n<strong>D is wrong</strong> because a maintenance window cutover does not provide gradual validation. Quality issues would affect all users simultaneously.'
  },
  {
    id: 61,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A Bedrock Agent is designed to answer product questions by querying a database tool and a documentation search tool. During testing, the agent frequently calls the database tool when it should use the documentation search tool, resulting in incorrect answers.\n\nWhat is the MOST likely fix?',
    options: [
      { letter: 'A', text: 'Increase the model temperature to encourage more diverse tool selection.' },
      { letter: 'B', text: 'Improve the tool descriptions to be more specific about when each tool should be used, including clear examples and boundary conditions.' },
      { letter: 'C', text: 'Remove the database tool from the agent.' },
      { letter: 'D', text: 'Switch to a larger foundation model.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> The agent selects tools based on their descriptions. If tool descriptions are vague or overlapping, the agent may choose the wrong tool. Improving descriptions to clearly differentiate when each tool should be used (e.g., "Use this for structured product data like prices, inventory" vs "Use this for product documentation, user guides, and FAQs") helps the agent make correct selections.\n\n<strong>A is wrong</strong> because higher temperature adds randomness, which would make tool selection LESS reliable, not more.\n\n<strong>C is wrong</strong> because removing the database tool eliminates useful functionality instead of fixing the selection logic.\n\n<strong>D is wrong</strong> because a larger model does not fix ambiguous tool descriptions. The root cause is the tool metadata, not the model size.'
  },
  {
    id: 62,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A developer has a golden dataset of 200 questions with known correct answers. They want to detect if their GenAI application starts hallucinating more over time.\n\nWhich monitoring approach should be implemented?',
    options: [
      { letter: 'A', text: 'Run the golden dataset against the application on a periodic schedule (e.g., weekly). Compare current responses to the reference answers using semantic similarity scoring. Track the scores over time and alert if the average score drops below a threshold.' },
      { letter: 'B', text: 'Monitor CloudWatch error rates and alert when 5xx errors increase.' },
      { letter: 'C', text: 'Ask users to report hallucinations and track the number of reports.' },
      { letter: 'D', text: 'Run the golden dataset once during initial deployment and never again.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Periodic golden dataset evaluation is the standard approach for detecting hallucination drift. By running the same questions regularly and comparing answers to known-correct references, you can detect when the application\'s accuracy changes over time. Tracking scores over time reveals trends, and threshold-based alerting provides early warning.\n\n<strong>B is wrong</strong> because error rates measure system health, not response accuracy. Hallucinations are returned as successful (200) responses with incorrect content.\n\n<strong>C is wrong</strong> because user reports are reactive and unreliable — many users may not recognize hallucinations, and reports arrive too late for early detection.\n\n<strong>D is wrong</strong> because a one-time evaluation does not detect drift over time. Model behavior, RAG data, and system interactions can all change.'
  },
  {
    id: 63,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A developer is troubleshooting a RAG application where users report that the system "knows" about topics that are NOT in the knowledge base documents. The system appears to be using information from the FM\'s training data instead of the retrieved documents.\n\nWhich solution MOST effectively prevents this behavior?',
    options: [
      { letter: 'A', text: 'Increase the number of retrieved documents (top-k) to provide more context.' },
      { letter: 'B', text: 'Enable the Contextual Grounding Check guardrail to ensure responses are grounded in retrieved documents, and add explicit instructions in the system prompt to only answer from the provided context.' },
      { letter: 'C', text: 'Switch to a smaller model that has less training data knowledge.' },
      { letter: 'D', text: 'Reduce the temperature to 0 to make the model more deterministic.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> The Contextual Grounding Check guardrail validates that FM responses are supported by the provided source documents. If the model generates content not grounded in the retrieved context, the guardrail blocks it. Combined with system prompt instructions to only use provided context, this provides defense-in-depth against the model using its training knowledge.\n\n<strong>A is wrong</strong> because more retrieved documents do not prevent the model from using its training data. The model could still mix in knowledge from its training regardless of how much context is provided.\n\n<strong>C is wrong</strong> because even smaller models have training knowledge that could leak into responses. Model size reduction is not a reliable way to prevent this.\n\n<strong>D is wrong</strong> because temperature=0 makes the model pick the most likely token deterministically, but does not prevent it from generating content from its training data.'
  },
  {
    id: 64,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A developer is testing a Bedrock Agent and notices that the agent enters an infinite loop, repeatedly calling the same tool with the same parameters and never reaching a final answer.\n\nWhat is the MOST appropriate fix?',
    options: [
      { letter: 'A', text: 'Increase the agent\'s maximum token budget.' },
      { letter: 'B', text: 'Set a maximum number of iterations (steps) for the agent, improve the tool\'s response format to include clear success/failure signals, and add instructions in the agent prompt about when to stop iterating.' },
      { letter: 'C', text: 'Switch to a different foundation model.' },
      { letter: 'D', text: 'Disable the tool that is causing the loop.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Three complementary fixes address infinite loops: a maximum iteration limit provides a hard stop, clear tool response signals (success/failure/no-more-results) help the agent decide when to stop, and prompt instructions guide the agent\'s stopping behavior. These address both the symptom (infinite loop) and root cause (agent not knowing when to stop).\n\n<strong>A is wrong</strong> because increasing the token budget allows the loop to run longer, not stop it.\n\n<strong>C is wrong</strong> because the issue is with tool design and agent configuration, not the model itself. A different model would likely exhibit the same behavior with the same tools.\n\n<strong>D is wrong</strong> because disabling the tool removes necessary functionality instead of fixing the loop behavior.'
  },
  {
    id: 65,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A developer needs to compare two foundation models (Claude Sonnet and Claude Haiku) to determine which provides better quality for their specific use case. They want a statistically rigorous comparison.\n\nWhich approach should the developer use?',
    options: [
      { letter: 'A', text: 'Run one test question on each model and compare the responses manually.' },
      { letter: 'B', text: 'Use Amazon Bedrock Model Evaluations to run both models against a test dataset with automated scoring (LLM-as-a-Judge and/or human evaluation), and compare aggregate metrics for quality, cost, and latency.' },
      { letter: 'C', text: 'Choose the model with the highest parameter count since larger models are always better.' },
      { letter: 'D', text: 'Select the cheaper model since cost is the only consideration.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Amazon Bedrock Model Evaluations provides a systematic framework for comparing models. Running both models against the same test dataset with consistent scoring (automated LLM-as-a-Judge or human evaluation) produces comparable metrics. Comparing quality, cost, and latency across models reveals the best option for the specific use case.\n\n<strong>A is wrong</strong> because a single test question is not statistically significant and cannot represent the full range of inputs the model will receive.\n\n<strong>C is wrong</strong> because larger models are not always better for every task. A smaller model may perform equally well for simple tasks at lower cost.\n\n<strong>D is wrong</strong> because cost is one factor among many. A cheaper model that produces poor quality results is not the right choice.'
  },
  {
    id: 66,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A developer notices that a prompt template that worked well for months is now producing inconsistent and lower-quality responses. No code changes or model updates have been made.\n\nWhich troubleshooting approach should the developer take FIRST?',
    options: [
      { letter: 'A', text: 'Rewrite the prompt from scratch.' },
      { letter: 'B', text: 'Analyze CloudWatch Logs and Bedrock Invocation Logs to compare recent request/response patterns against historical baselines, and check if the RAG data source has changed.' },
      { letter: 'C', text: 'Switch to a different foundation model.' },
      { letter: 'D', text: 'Increase the temperature to generate more diverse responses.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> The first troubleshooting step should be diagnostic — understanding what changed. Analyzing logs reveals whether input patterns (e.g., RAG context, user queries) have shifted. Comparing recent requests against historical baselines identifies the divergence point. Common causes include changes in RAG data sources, increased context length, or shifted user query patterns.\n\n<strong>A is wrong</strong> because rewriting the prompt without understanding the root cause may not fix the issue and could introduce new problems.\n\n<strong>C is wrong</strong> because switching models is premature without understanding why the current configuration changed behavior.\n\n<strong>D is wrong</strong> because higher temperature would increase inconsistency, making the problem worse.'
  },
  {
    id: 67,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A GenAI application returns errors intermittently with the message "ValidationException: Input is too long for requested model." The prompt template includes a system prompt, few-shot examples, and RAG context.\n\nWhich troubleshooting approach resolves this issue?',
    options: [
      { letter: 'A', text: 'Switch to a model with a larger context window.' },
      { letter: 'B', text: 'Implement dynamic context management: monitor input token count, truncate or summarize RAG context when approaching the limit, and reduce few-shot examples for queries with large context.' },
      { letter: 'C', text: 'Remove all few-shot examples permanently.' },
      { letter: 'D', text: 'Increase the max_tokens parameter for responses.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Dynamic context management adapts the prompt content based on available token budget. By monitoring input token count before sending, you can truncate or summarize RAG context when it is too large, and reduce few-shot examples dynamically. This prevents the context window overflow while maintaining quality for most requests.\n\n<strong>A is wrong</strong> because while a larger context window works, it is more expensive per token and does not address the root cause of uncontrolled context growth.\n\n<strong>C is wrong</strong> because permanently removing few-shot examples degrades quality for all requests, even those that fit within the context window.\n\n<strong>D is wrong</strong> because max_tokens controls the OUTPUT length limit, not the INPUT length limit. The error is about input being too long.'
  },
  {
    id: 68,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A developer wants to implement automated quality gates in the CI/CD pipeline for a GenAI application. The quality gate should prevent deployment if the new version\'s response quality drops below the current production baseline.\n\nWhich implementation approach is correct?',
    options: [
      { letter: 'A', text: 'Add a CI/CD stage that runs a test suite of golden dataset questions against the new version, compares quality scores against the production baseline, and fails the pipeline if scores drop by more than a defined threshold.' },
      { letter: 'B', text: 'Manually review responses before each deployment.' },
      { letter: 'C', text: 'Deploy automatically and use CloudWatch alarms to roll back if issues are detected.' },
      { letter: 'D', text: 'Only run unit tests on the application code without testing FM outputs.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Automated quality gates in CI/CD use golden dataset evaluations to programmatically verify that new versions maintain quality. The pipeline runs test questions, computes quality scores (using semantic similarity, LLM-as-a-Judge, or other metrics), compares against the baseline, and fails the deployment if regression is detected. This prevents quality degradation from reaching production.\n\n<strong>B is wrong</strong> because manual review does not scale and slows down the deployment pipeline.\n\n<strong>C is wrong</strong> because deploying first and rolling back later means users are already affected by the quality degradation.\n\n<strong>D is wrong</strong> because unit tests verify application code logic but do not test FM output quality, which is the primary concern for GenAI applications.'
  },
  {
    id: 69,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A developer is evaluating a Bedrock Agent\'s performance. The agent completes tasks but takes an excessive number of steps (tool calls) to reach the final answer. Some tasks that should take 2-3 steps are taking 8-10 steps.\n\nWhich metrics and evaluations should the developer analyze?',
    options: [
      { letter: 'A', text: 'Only measure task completion rate — if the agent completes tasks, it is performing well.' },
      { letter: 'B', text: 'Use Bedrock Agent Evaluations to measure task completion rate, tool usage effectiveness (right tools for the right tasks), reasoning quality (is the multi-step logic sound?), and step efficiency (minimum steps needed).' },
      { letter: 'C', text: 'Monitor only the total latency per request.' },
      { letter: 'D', text: 'Count the total number of tokens consumed per task.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Bedrock Agent Evaluations assess multiple dimensions of agent performance: task completion rate (does it finish?), tool usage effectiveness (does it pick the right tools?), reasoning quality (is the logic sound?), and efficiency (how many steps?). Analyzing all these metrics reveals why the agent takes too many steps — it may be using wrong tools, reasoning poorly, or lacking clear stopping criteria.\n\n<strong>A is wrong</strong> because task completion rate alone does not reveal efficiency problems. An agent that completes a task in 10 steps instead of 3 wastes time, tokens, and money.\n\n<strong>C is wrong</strong> because total latency is an effect, not a cause. Understanding which steps are unnecessary requires deeper analysis of the reasoning and tool selection.\n\n<strong>D is wrong</strong> because token count measures cost but does not diagnose why the agent takes excessive steps.'
  },
  {
    id: 70,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A RAG application retrieves documents but users report that answers often do not directly address their questions. The developer checks the retrieval logs and finds that the retrieved documents ARE relevant to the topic, but the specific answers users need are buried in large chunks of text.\n\nWhich fix addresses this issue?',
    options: [
      { letter: 'A', text: 'Switch to a larger foundation model with a bigger context window.' },
      { letter: 'B', text: 'Reduce chunk size to create more focused chunks, adjust chunk overlap to maintain context, and consider using semantic chunking that splits on paragraph/section boundaries.' },
      { letter: 'C', text: 'Increase the number of documents retrieved (higher top-k).' },
      { letter: 'D', text: 'Add more documents to the knowledge base.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> The problem is that relevant information is diluted within large chunks. Reducing chunk size creates more focused, specific chunks where the key information is not buried. Chunk overlap ensures information at chunk boundaries is not lost. Semantic chunking splits on natural boundaries (paragraphs, sections) to keep coherent ideas together.\n\n<strong>A is wrong</strong> because a larger context window does not help if the chunks are too large and unfocused. The FM receives relevant chunks but cannot extract the specific answer because it is mixed with irrelevant content.\n\n<strong>C is wrong</strong> because retrieving more documents (higher top-k) adds more context but with the same chunk quality problem, potentially making the dilution worse.\n\n<strong>D is wrong</strong> because adding more documents to the knowledge base does not fix the chunking issue. The relevant information is already in the knowledge base — it is just poorly chunked.'
  },
  {
    id: 71,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A developer receives a "ThrottlingException" error when calling the Bedrock InvokeModel API during a traffic spike.\n\nWhich troubleshooting approach should the developer implement?',
    options: [
      { letter: 'A', text: 'Implement exponential backoff with jitter in the retry logic, and consider requesting a service quota increase or using Provisioned Throughput for predictable high-traffic periods.' },
      { letter: 'B', text: 'Retry the request immediately in a tight loop until it succeeds.' },
      { letter: 'C', text: 'Switch to a different AWS region immediately.' },
      { letter: 'D', text: 'Increase the max_tokens parameter to reduce throttling.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> ThrottlingException means the request rate exceeds the service quota. Exponential backoff with jitter is the standard retry pattern that avoids overwhelming the service. For sustained high traffic, requesting a service quota increase provides a higher limit, and Provisioned Throughput guarantees capacity for predictable workloads.\n\n<strong>B is wrong</strong> because immediate retry in a tight loop (retry storm) makes throttling worse by adding more requests to an already overloaded service.\n\n<strong>C is wrong</strong> because switching regions does not address the root cause and may not have the required model available. Cross-Region Inference is a managed approach for multi-region capacity.\n\n<strong>D is wrong</strong> because max_tokens controls response length, not request rate limits. Throttling is based on requests per second, not token count.'
  },
  {
    id: 72,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A developer is testing a GenAI application that generates product descriptions. They need a systematic way to compare the quality of prompts — Version A (simple prompt) vs Version B (few-shot prompt with examples).\n\nWhich service supports this A/B testing workflow?',
    options: [
      { letter: 'A', text: 'Amazon Bedrock Prompt Flows to create a workflow that routes traffic between prompt versions and collects comparative metrics.' },
      { letter: 'B', text: 'AWS CodePipeline to deploy prompt versions to separate environments.' },
      { letter: 'C', text: 'Amazon CloudWatch to create separate dashboards for each prompt version.' },
      { letter: 'D', text: 'AWS Step Functions to orchestrate manual prompt comparison.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Amazon Bedrock Prompt Flows provides a visual workflow builder that can route requests between different prompt versions, collect responses, and facilitate comparison. Combined with Bedrock Model Evaluations, it enables systematic A/B testing of prompt variants with automated metrics collection.\n\n<strong>B is wrong</strong> because CodePipeline manages code deployment, not prompt A/B testing. Deploying to separate environments creates operational overhead without built-in comparison capabilities.\n\n<strong>C is wrong</strong> because CloudWatch dashboards display metrics but do not manage the routing and comparison of prompt versions.\n\n<strong>D is wrong</strong> because while Step Functions could orchestrate a custom comparison workflow, it requires building everything from scratch. Bedrock Prompt Flows provides purpose-built A/B testing support.'
  },
  {
    id: 73,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A developer notices that their embedding model produces vectors where semantically similar documents have LOW cosine similarity scores. Documents about the same topic are being placed far apart in the vector space.\n\nWhat should the developer investigate?',
    options: [
      { letter: 'A', text: 'The embedding model may not be appropriate for the domain, the text preprocessing may be stripping important context, or the chunking strategy may be splitting semantically related content across chunks.' },
      { letter: 'B', text: 'The vector database index is corrupted and needs to be rebuilt.' },
      { letter: 'C', text: 'The cosine similarity threshold needs to be increased.' },
      { letter: 'D', text: 'The foundation model being used for generation is incorrect.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Low similarity for semantically similar documents typically indicates issues with how content is prepared for embedding: the embedding model may not understand the domain vocabulary, text preprocessing may remove important context (e.g., stripping technical terms, removing headers), or chunking may split related content into separate chunks that lose their semantic coherence.\n\n<strong>B is wrong</strong> because index corruption would cause search failures or errors, not consistently low similarity scores for related documents.\n\n<strong>C is wrong</strong> because the similarity threshold controls which results are returned, not the quality of the embeddings themselves. Increasing the threshold would return FEWER results, not improve embedding quality.\n\n<strong>D is wrong</strong> because the generation model (FM) is separate from the embedding model. Poor embeddings are an embedding/retrieval problem, not a generation problem.'
  },
  {
    id: 74,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A company wants to collect user feedback on their GenAI chatbot\'s responses to continuously improve the system. They need structured feedback that can be used for model evaluation.\n\nWhich approach provides the MOST actionable feedback data?',
    options: [
      { letter: 'A', text: 'Implement thumbs up/down rating buttons on each response, with an optional text field for explaining the rating. Store feedback with the corresponding question, response, and retrieved context for analysis.' },
      { letter: 'B', text: 'Send a monthly survey to users asking about their overall satisfaction.' },
      { letter: 'C', text: 'Monitor user session duration as a proxy for satisfaction.' },
      { letter: 'D', text: 'Count the number of follow-up questions as a measure of response quality.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> In-context feedback (thumbs up/down) linked to specific question-response pairs provides the most actionable data. The binary rating enables quantitative analysis, the optional text explanation provides qualitative insight, and storing the full context (question, response, retrieved docs) allows for root cause analysis of poor responses and can be used to create evaluation datasets.\n\n<strong>B is wrong</strong> because monthly surveys capture general sentiment but cannot link feedback to specific interactions. The time delay also means users may not remember specific quality issues.\n\n<strong>C is wrong</strong> because session duration is an unreliable proxy — long sessions could mean engagement or frustration.\n\n<strong>D is wrong</strong> because follow-up questions could indicate either poor initial response quality (user needed clarification) or genuine curiosity (user was engaged). It is ambiguous.'
  },
  {
    id: 75,
    domain: 'D5',
    domainName: 'Testing, Validation & Troubleshooting',
    multi: false,
    text: 'A developer uses CloudWatch Logs Insights to analyze Bedrock Invocation Logs. They want to identify which queries produce the highest hallucination rates by comparing responses against their golden dataset.\n\nWhich analysis pipeline should the developer build?',
    options: [
      { letter: 'A', text: 'Use CloudWatch Logs Insights to query invocation logs, extract the prompt and response pairs, run them through an LLM-as-a-Judge evaluation against the golden dataset, and track hallucination scores as CloudWatch custom metrics with alarms on threshold violations.' },
      { letter: 'B', text: 'Use CloudWatch Logs Insights alone to detect hallucinations by searching for keywords like "I don\'t know" in responses.' },
      { letter: 'C', text: 'Manually review every response in the CloudWatch Logs console.' },
      { letter: 'D', text: 'Use AWS Config to track when the model configuration changes and correlate with quality.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> This is a complete hallucination detection pipeline: CloudWatch Logs Insights queries the invocation logs to extract prompt/response pairs, LLM-as-a-Judge compares responses against golden dataset reference answers to score hallucination, and custom CloudWatch metrics track hallucination rates over time with alarms for automated alerting.\n\n<strong>B is wrong</strong> because keyword searching is unreliable for hallucination detection. Hallucinations are confidently stated incorrect information — the model does NOT say "I don\'t know" when it hallucinates.\n\n<strong>C is wrong</strong> because manual review does not scale and is not systematic enough for continuous monitoring.\n\n<strong>D is wrong</strong> because AWS Config tracks resource configuration changes, not response quality. Model configuration changes may or may not correlate with hallucination rates.'
  },
]
