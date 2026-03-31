import type { Question } from './questions'

export const questionsV6: Question[] = [
  // ─── Domain 1: FM Integration, Data & Compliance (23 questions, IDs 1–23) ───
  {
    id: 1,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A generative AI application uses Amazon Bedrock to summarize lengthy legal contracts. Users report that the generated summaries are sometimes cut off mid-sentence. The application uses the InvokeModel API with default parameters.\n\nWhat is the MOST likely cause and fix?',
    options: [
      { letter: 'B', text: 'The model\'s context window is too small. Switch to a model with a larger context window.' },
      { letter: 'A', text: 'The maxTokens parameter in the inference configuration is set too low. Increase maxTokens to allow a longer completion.' },
      { letter: 'C', text: 'The temperature parameter is too high, causing the model to lose coherence. Lower the temperature to 0.' },
      { letter: 'D', text: 'The stopSequences parameter contains a newline character. Remove the newline from stopSequences.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> When a model\'s response is cut off mid-sentence, the most common cause is that the maxTokens limit for the response has been reached. By default, many Bedrock models have a conservative maxTokens value. Increasing it allows the model to generate a longer, complete summary. <strong>A is wrong</strong> because the context window affects input length, not output truncation — the model would reject the request entirely if input exceeded the context window. <strong>C is wrong</strong> because high temperature causes randomness, not mid-sentence cutoffs. <strong>D is wrong</strong> because stopSequences would need to be explicitly configured to contain a newline; the default does not include one.'
  },
  {
    id: 2,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A legal firm is building a RAG application over thousands of regulatory documents. Each document contains multiple sections covering different topics (definitions, penalties, procedures). Users ask questions that span multiple topics within a single document. The team finds that retrieved chunks often contain irrelevant text from adjacent sections.\n\nWhich chunking strategy will MOST improve retrieval relevance?',
    options: [
      { letter: 'A', text: 'Use fixed-size chunking with a larger chunk size of 2,000 tokens and 200-token overlap.' },
      { letter: 'B', text: 'Use hierarchical chunking that preserves the document\'s section and subsection structure as parent-child relationships.' },
      { letter: 'C', text: 'Use no chunking and pass the entire document to the model for each query.' },
      { letter: 'D', text: 'Use fixed-size chunking with a very small chunk size of 100 tokens to maximize precision.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Hierarchical chunking preserves the document\'s logical structure (sections, subsections) as parent-child relationships. When a child chunk matches, the system can include parent context, and chunks don\'t bleed across section boundaries. This is ideal for structured legal documents where topics are organized by section. <strong>A is wrong</strong> because larger fixed-size chunks will still cross section boundaries and include irrelevant adjacent text. <strong>C is wrong</strong> because passing entire documents wastes context window space and may exceed model limits for large legal documents. <strong>D is wrong</strong> because very small chunks lose context and may not contain enough information to be meaningful on their own.'
  },
  {
    id: 3,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A company has an Amazon Bedrock Knowledge Base backed by an OpenSearch Serverless vector store. Users search for "HIPAA compliance requirements for cloud storage" but the results include unrelated documents about general cloud architecture. The documents do have correct metadata tags like category and regulation_type.\n\nWhat should the team do to improve retrieval accuracy?',
    options: [
      { letter: 'A', text: 'Switch from OpenSearch Serverless to Amazon Aurora pgvector for better semantic search.' },
      { letter: 'C', text: 'Enable hybrid search to combine semantic and keyword matching, and add metadata filtering to restrict results by regulation_type.' },
      { letter: 'B', text: 'Increase the number of retrieved chunks from 5 to 50 to improve recall.' },
      { letter: 'D', text: 'Re-embed all documents using a larger embedding model dimension size.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> Hybrid search combines semantic (vector) search with keyword (lexical) search, improving recall for queries with specific terms like "HIPAA." Adding metadata filtering narrows results to only documents tagged with the relevant regulation_type, eliminating irrelevant results. Amazon Bedrock Knowledge Bases natively supports both hybrid search and metadata filtering. <strong>A is wrong</strong> because switching vector stores does not inherently improve search relevance — the issue is the search strategy, not the database. <strong>B is wrong</strong> because retrieving more chunks increases recall but also increases noise; it does not solve the relevance problem. <strong>D is wrong</strong> because larger embedding dimensions improve representation capacity but do not address the fundamental issue of mixing semantic with keyword search or filtering by metadata.'
  },
  {
    id: 4,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A data engineering team manages an Amazon Bedrock Knowledge Base. They want retrieved results to be filterable by document attributes such as department, document_type, and publish_date. The source documents are stored in Amazon S3.\n\nHow should the team configure the metadata for Knowledge Base filtering?',
    options: [
      { letter: 'A', text: 'Add S3 object tags for each attribute. The Knowledge Base automatically reads S3 object tags during ingestion.' },
      { letter: 'D', text: 'Create a .metadata.json file alongside each document in S3 with the filterable attributes. Configure the Knowledge Base data source to use these metadata files.' },
      { letter: 'C', text: 'Store the metadata in a separate DynamoDB table and configure the Knowledge Base to join against it at query time.' },
      { letter: 'B', text: 'Embed the metadata as the first line of each document so it gets included in the chunk embeddings.' }
    ],
    correct: ['D'],
    explanation: '<strong>D is correct.</strong> Amazon Bedrock Knowledge Bases support metadata filtering through companion .metadata.json files stored alongside documents in S3. Each JSON file contains key-value attributes (strings, numbers, booleans) that become filterable fields at query time using the filter parameter in the Retrieve or RetrieveAndGenerate API. <strong>A is wrong</strong> because Bedrock Knowledge Bases do not read S3 object tags as metadata for filtering; the supported mechanism is .metadata.json files. <strong>C is wrong</strong> because Knowledge Bases do not support external metadata joins from DynamoDB at query time. <strong>B is wrong</strong> because embedding metadata in document text pollutes the semantic embeddings and does not enable structured filtering.'
  },
  {
    id: 5,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A company has an Amazon Bedrock Knowledge Base with thousands of product manuals in S3. New manuals are uploaded to S3 daily. The team needs the Knowledge Base vector store to be updated automatically when new documents arrive.\n\nWhat is the MOST operationally efficient solution?',
    options: [
      { letter: 'A', text: 'Create an S3 event notification that triggers an AWS Lambda function. The Lambda function calls the StartIngestionJob API on the Knowledge Base data source.' },
      { letter: 'B', text: 'Schedule a nightly AWS Glue job that reads S3 and writes embeddings directly to the OpenSearch Serverless index.' },
      { letter: 'C', text: 'Use Amazon EventBridge Scheduler to call the StartIngestionJob API on a fixed hourly schedule.' },
      { letter: 'D', text: 'Enable S3 versioning. The Knowledge Base automatically detects new versions and re-ingests changed documents.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> S3 event notifications trigger a Lambda function in near real-time when new objects are uploaded. The Lambda calls the Bedrock StartIngestionJob API to sync the Knowledge Base, ensuring the vector store is updated promptly and automatically with minimal operational overhead. <strong>B is wrong</strong> because writing embeddings directly to OpenSearch bypasses the Knowledge Base ingestion pipeline (chunking, metadata extraction) and is operationally complex. <strong>C is wrong</strong> because a fixed hourly schedule is not as efficient — it either runs unnecessarily when no new docs arrive or introduces delays of up to an hour. <strong>D is wrong</strong> because Bedrock Knowledge Bases do not automatically detect S3 changes; ingestion must be explicitly triggered via the API or console.'
  },
  {
    id: 6,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A healthcare startup is using Amazon Bedrock to generate patient-facing summaries from medical research papers. The model sometimes uses overly technical medical jargon that patients cannot understand.\n\nWhich approach will MOST effectively ensure the output uses plain language?',
    options: [
      { letter: 'A', text: 'Lower the temperature to 0 to make the model more deterministic.' },
      { letter: 'B', text: 'Use a system prompt that instructs the model to write at an 8th-grade reading level and avoid medical jargon, providing examples of preferred language.' },
      { letter: 'C', text: 'Fine-tune the model on a dataset of simplified medical explanations.' },
      { letter: 'D', text: 'Increase the top_p parameter to 1.0 to allow more diverse vocabulary.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> A well-crafted system prompt with explicit reading level instructions and examples of preferred language is the most direct and cost-effective way to control output style. Bedrock models follow system prompt instructions for tone, vocabulary, and complexity. <strong>A is wrong</strong> because temperature controls randomness, not vocabulary complexity — a deterministic output can still be highly technical. <strong>C is wrong</strong> because fine-tuning is expensive and time-consuming; prompt engineering achieves this goal without retraining. <strong>D is wrong</strong> because top_p controls sampling diversity, not reading level or jargon usage.'
  },
  {
    id: 7,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: true,
    text: 'A company is building a RAG application using Amazon Bedrock Knowledge Bases. The application must retrieve results from a vector store and also apply keyword matching for specific technical terms like part numbers and error codes.\n\nWhich TWO features should the team enable? (Select TWO.)',
    options: [
      { letter: 'A', text: 'Enable hybrid search mode in the Knowledge Base retrieval configuration.' },
      { letter: 'C', text: 'Create a separate Amazon Kendra index for keyword search and merge results manually.' },
      { letter: 'B', text: 'Configure metadata filtering to match part numbers as structured attributes.' },
      { letter: 'D', text: 'Disable vector search and use only keyword-based BM25 retrieval.' },
      { letter: 'E', text: 'Increase the embedding model dimensions to better capture exact terms.' }
    ],
    correct: ['A', 'B'],
    explanation: '<strong>A is correct.</strong> Hybrid search in Bedrock Knowledge Bases combines semantic vector search with keyword-based (lexical) search. This ensures that exact technical terms like part numbers are matched even if the embedding doesn\'t capture them well. <strong>C is correct.</strong> Metadata filtering allows structured attributes like part numbers to be stored as filterable metadata, enabling exact-match filtering alongside semantic search. <strong>B is wrong</strong> because adding a separate Kendra index introduces unnecessary complexity when hybrid search is natively supported. <strong>D is wrong</strong> because disabling vector search entirely loses the semantic understanding needed for natural language queries. <strong>E is wrong</strong> because larger embedding dimensions improve general representation but do not guarantee exact keyword matching for specific codes.'
  },
  {
    id: 8,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A media company uses Amazon Bedrock to generate article summaries. The model occasionally produces summaries that include information not present in the original article. The team wants to minimize these hallucinations.\n\nWhich combination of techniques is MOST effective?',
    options: [
      { letter: 'C', text: 'Use RAG with the source article as context, set temperature to 0, and include a system prompt instructing the model to only use information from the provided context.' },
      { letter: 'B', text: 'Fine-tune the model on a dataset of article-summary pairs to teach it the correct summarization style.' },
      { letter: 'A', text: 'Increase the maxTokens parameter and set top_p to 0.5 to constrain the output distribution.' },
      { letter: 'D', text: 'Use Amazon Bedrock Guardrails to block any response that contains hallucinated content.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> Combining RAG (providing the source article as context), low temperature (deterministic output), and explicit system prompt instructions to stay within the provided context is the most effective multi-layered approach to minimizing hallucinations. <strong>B is wrong</strong> because fine-tuning teaches style but does not prevent the model from generating information beyond what is in a specific article at inference time. <strong>A is wrong</strong> because maxTokens controls length and top_p controls diversity — neither specifically addresses factual grounding. <strong>D is wrong</strong> because Guardrails can filter harmful or off-topic content but cannot reliably detect whether specific facts are hallucinated versus present in the source document.'
  },
  {
    id: 9,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A company wants to customize an Amazon Bedrock foundation model to understand domain-specific vocabulary used in the semiconductor industry. The company has 10 GB of unlabeled internal technical documents but no labeled prompt-completion pairs.\n\nWhich approach should the company use?',
    options: [
      { letter: 'D', text: 'Use Amazon Bedrock continued pre-training with the unlabeled documents stored in S3.' },
      { letter: 'B', text: 'Use Amazon Bedrock fine-tuning with the unlabeled documents formatted as JSONL.' },
      { letter: 'C', text: 'Use Amazon Bedrock Prompt Flows to inject the vocabulary at inference time.' },
      { letter: 'A', text: 'Use Amazon Bedrock model evaluation to score the model\'s understanding of semiconductor terms.' }
    ],
    correct: ['D'],
    explanation: '<strong>D is correct.</strong> Continued pre-training in Amazon Bedrock accepts unlabeled text data from S3 and adapts the model\'s internal weights to better understand domain-specific vocabulary and concepts. It does not require labeled prompt-completion pairs, making it ideal for this use case. <strong>B is wrong</strong> because fine-tuning requires labeled data in prompt-completion format, which the company does not have. <strong>C is wrong</strong> because Prompt Flows orchestrate multi-step workflows but do not change the model\'s internal understanding of vocabulary. <strong>D is wrong</strong> because model evaluation measures performance but does not improve or customize the model.'
  },
  {
    id: 10,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'An application sends a 150,000-token document to an Amazon Bedrock model with a 200,000-token context window for summarization. The model returns an error indicating the request was rejected.\n\nWhat is the MOST likely cause?',
    options: [
      { letter: 'A', text: 'The total of input tokens plus the requested maxTokens for the response exceeds the model\'s context window.' },
      { letter: 'B', text: 'The model does not support documents larger than 100,000 tokens regardless of context window size.' },
      { letter: 'C', text: 'The request timed out because processing 150,000 tokens takes longer than the API timeout.' },
      { letter: 'D', text: 'The model\'s temperature parameter must be set to 0 for inputs exceeding 100,000 tokens.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> The context window must accommodate both the input tokens AND the requested output tokens (maxTokens). If the input is 150,000 tokens and maxTokens is set to 50,001 or more, the total exceeds the 200,000-token context window, causing the request to be rejected. The fix is to reduce maxTokens so input + output fits within the window. <strong>B is wrong</strong> because there is no separate hard limit on input size apart from the context window. <strong>C is wrong</strong> because the error indicates rejection, not a timeout — the model validates the token count before processing. <strong>D is wrong</strong> because temperature has no relationship to input size limits.'
  },
  {
    id: 11,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A financial services company is building a document Q&A system. Users ask natural language questions but also search by exact account numbers and policy IDs. Pure semantic search misses exact ID matches, while pure keyword search misses questions phrased differently from the document text.\n\nWhich retrieval approach should the team use?',
    options: [
      { letter: 'B', text: 'Use Amazon Bedrock Knowledge Base hybrid search that combines semantic and keyword retrieval with automatic score fusion.' },
      { letter: 'A', text: 'Build two separate retrieval pipelines (one semantic, one keyword) and alternate between them based on query type.' },
      { letter: 'C', text: 'Use only semantic search but add the account numbers as metadata filters.' },
      { letter: 'D', text: 'Pre-process all queries to extract IDs and replace them with natural language descriptions before searching.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Hybrid search in Amazon Bedrock Knowledge Bases natively combines semantic (vector) search with keyword (lexical/BM25) search and applies automatic score fusion. This handles both natural language queries and exact term matches in a single retrieval call. <strong>A is wrong</strong> because maintaining two separate pipelines adds complexity, requires query classification logic, and cannot benefit from score fusion. <strong>C is wrong</strong> because metadata filtering only works for pre-defined structured attributes — users would need to provide the exact account number as a filter, not as part of a natural language question. <strong>D is wrong</strong> because automatically extracting and transforming IDs in queries is fragile and introduces another point of failure.'
  },
  {
    id: 12,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A company uses semantic chunking for their Amazon Bedrock Knowledge Base. After deployment, they notice that chunks for short FAQ-style documents are too small and lack context, while chunks for long technical manuals are appropriate.\n\nWhat should the team do to address this?',
    options: [
      { letter: 'A', text: 'Switch to fixed-size chunking with a single chunk size that works for both document types.' },
      { letter: 'C', text: 'Use different data sources within the same Knowledge Base — one with semantic chunking for manuals and one with fixed-size chunking for FAQs.' },
      { letter: 'B', text: 'Increase the maximum chunk size parameter for semantic chunking to make FAQ chunks larger.' },
      { letter: 'D', text: 'Concatenate all FAQ documents into a single large document before ingestion.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> Amazon Bedrock Knowledge Bases support multiple data sources, each with its own chunking configuration. By creating separate data sources for different document types, the team can apply the optimal chunking strategy per document type within the same Knowledge Base. <strong>A is wrong</strong> because a single fixed chunk size cannot optimally serve both short FAQ documents and long technical manuals. <strong>B is wrong</strong> because increasing the maximum chunk size for semantic chunking does not ensure short documents get larger chunks — semantic chunking splits on meaning boundaries, not size. <strong>D is wrong</strong> because concatenating FAQs destroys document boundaries and creates semantically confusing chunks that mix unrelated topics.'
  },
  {
    id: 13,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A company fine-tuned an Amazon Bedrock model on customer support conversations. The fine-tuned model performs well on support queries but now refuses to answer general knowledge questions that the base model handled correctly.\n\nWhat is the MOST likely cause?',
    options: [
      { letter: 'D', text: 'Catastrophic forgetting — the fine-tuning process overwrote the model\'s general knowledge with the narrow support domain.' },
      { letter: 'B', text: 'The fine-tuned model has a smaller context window than the base model.' },
      { letter: 'C', text: 'The model\'s guardrails were automatically tightened during fine-tuning.' },
      { letter: 'A', text: 'The fine-tuning dataset contained too many examples, causing overfitting to the training data format.' }
    ],
    correct: ['D'],
    explanation: '<strong>D is correct.</strong> Catastrophic forgetting is a well-known phenomenon where fine-tuning on a narrow domain causes the model to lose previously learned general capabilities. The model becomes specialized for the training distribution and loses broader knowledge. <strong>B is wrong</strong> because fine-tuning does not change the model\'s context window size. <strong>C is wrong</strong> because guardrails are configured separately and are not modified by fine-tuning. <strong>D is wrong</strong> because while overfitting is possible, the described behavior (refusing general questions entirely) is characteristic of catastrophic forgetting, not format overfitting.'
  },
  {
    id: 14,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A team is building a Knowledge Base with Amazon Bedrock. They need to choose an embedding model for their vector store. The documents are primarily in English and contain technical diagrams with captions.\n\nWhich Amazon Titan embedding model is the BEST choice?',
    options: [
      { letter: 'B', text: 'Amazon Titan Text Embeddings V2 with 1024 dimensions.' },
      { letter: 'A', text: 'Amazon Titan Multimodal Embeddings G1 to handle both text and images.' },
      { letter: 'C', text: 'Amazon Titan Text Embeddings V1 for backward compatibility.' },
      { letter: 'D', text: 'Amazon Titan Image Generator to extract text from diagrams first.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Amazon Titan Multimodal Embeddings G1 can create embeddings from both text and images, making it ideal for documents with technical diagrams. It can embed diagram images alongside their captions, enabling retrieval based on visual content. <strong>B is wrong</strong> because text-only embeddings cannot capture the information in technical diagrams. <strong>C is wrong</strong> because V1 is text-only and older; V2 is preferred for text, but neither handles images. <strong>D is wrong</strong> because Titan Image Generator creates images from text prompts — it does not extract text from existing images.'
  },
  {
    id: 15,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A company stores training data for Amazon Bedrock model customization in an S3 bucket. Corporate policy requires that all data used for model training must be encrypted with a customer-managed AWS KMS key and that no training data should ever leave the AWS Region.\n\nWhich configuration meets these requirements?',
    options: [
      { letter: 'B', text: 'Enable S3 server-side encryption with a customer-managed KMS key (SSE-KMS). Use Amazon Bedrock model customization, which processes data within the same Region by default.' },
      { letter: 'A', text: 'Enable S3 client-side encryption before upload. Configure Bedrock to decrypt the data during training.' },
      { letter: 'C', text: 'Enable S3 default encryption with Amazon S3 managed keys (SSE-S3). Configure a VPC endpoint for Bedrock.' },
      { letter: 'D', text: 'Copy the training data to an EBS volume attached to a SageMaker notebook. Run training from the notebook.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> SSE-KMS with a customer-managed key satisfies the encryption requirement. Amazon Bedrock model customization (fine-tuning and continued pre-training) processes training data within the same AWS Region and does not move data across Regions, satisfying the data residency requirement. <strong>A is wrong</strong> because Bedrock does not support decrypting client-side encrypted data during training. <strong>C is wrong</strong> because SSE-S3 uses AWS-managed keys, not customer-managed keys, violating the corporate policy. <strong>D is wrong</strong> because this uses SageMaker instead of Bedrock, adds operational complexity, and does not align with the Bedrock model customization workflow.'
  },
  {
    id: 16,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A team is ingesting PDF documents into an Amazon Bedrock Knowledge Base. Some PDFs contain tables with numerical data. After ingestion, queries about table values return inaccurate results because the chunking process breaks tables across multiple chunks.\n\nWhat should the team do?',
    options: [
      { letter: 'C', text: 'Use Amazon Bedrock\'s built-in parsing with the foundation model parser option to extract and preserve table structures during ingestion.' },
      { letter: 'B', text: 'Convert all PDFs to plain text before uploading to S3.' },
      { letter: 'A', text: 'Increase the chunk overlap to 50% to ensure table data appears in multiple chunks.' },
      { letter: 'D', text: 'Use a smaller chunk size to ensure each table cell becomes its own chunk.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> Amazon Bedrock Knowledge Bases supports advanced parsing options including a foundation model (FM) parser that can intelligently extract and preserve table structures from PDFs. This ensures tables are kept intact and properly represented in the vector store. <strong>B is wrong</strong> because converting PDFs to plain text destroys table formatting and spatial relationships between cells. <strong>A is wrong</strong> because overlap creates redundancy but does not prevent tables from being split at arbitrary points. <strong>D is wrong</strong> because smaller chunks would split tables into even more fragments, making the problem worse.'
  },
  {
    id: 17,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: true,
    text: 'A retail company wants to build a product recommendation chatbot using Amazon Bedrock Agents. The agent needs to look up real-time inventory from a REST API and also search a product catalog in an Amazon Bedrock Knowledge Base.\n\nWhich TWO configurations are required? (Select TWO.)',
    options: [
      { letter: 'B', text: 'Define an action group with an API schema (OpenAPI) that points to a Lambda function calling the inventory REST API.' },
      { letter: 'C', text: 'Associate the product catalog Knowledge Base with the Bedrock Agent.' },
      { letter: 'B', text: 'Create a custom orchestration Lambda that calls both the REST API and Knowledge Base sequentially.' },
      { letter: 'D', text: 'Fine-tune the agent\'s underlying model on inventory data so it knows current stock levels.' },
      { letter: 'E', text: 'Store the REST API credentials in the agent\'s system prompt for authentication.' }
    ],
    correct: ['B', 'C'],
    explanation: '<strong>B is correct.</strong> Bedrock Agents use action groups with OpenAPI schemas to interact with external APIs. A Lambda function serves as the bridge between the agent and the inventory REST API. <strong>C is correct.</strong> Bedrock Agents natively support Knowledge Base associations, allowing the agent to automatically query the product catalog KB when relevant. <strong>B is wrong</strong> because Bedrock Agents handle orchestration automatically — a custom orchestration Lambda is unnecessary. <strong>D is wrong</strong> because fine-tuning embeds static knowledge into model weights and cannot provide real-time inventory data. <strong>E is wrong</strong> because API credentials should never be stored in prompts — they should be managed via Lambda environment variables or AWS Secrets Manager.'
  },
  {
    id: 18,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A company is using Amazon Bedrock to classify customer emails into categories. The model works well for English emails but performs poorly on Spanish emails. The company has a large corpus of Spanish business emails but no labeled classification data in Spanish.\n\nWhich approach is MOST appropriate?',
    options: [
      { letter: 'D', text: 'Use continued pre-training with the unlabeled Spanish email corpus to improve the model\'s Spanish language understanding, then use few-shot prompting for classification.' },
      { letter: 'B', text: 'Translate all Spanish emails to English using Amazon Translate before sending them to the model.' },
      { letter: 'C', text: 'Fine-tune the model on the unlabeled Spanish emails with random classification labels.' },
      { letter: 'A', text: 'Increase the temperature parameter to make the model more creative with Spanish text.' }
    ],
    correct: ['D'],
    explanation: '<strong>D is correct.</strong> Continued pre-training with the unlabeled Spanish corpus adapts the model\'s weights to better understand Spanish business language and terminology. Combined with few-shot prompting (providing example classifications in the prompt), this effectively extends the model\'s capabilities without requiring labeled data. <strong>B is wrong</strong> because translation adds latency, cost, and can lose nuance — especially for domain-specific business terminology. <strong>C is wrong</strong> because fine-tuning with random labels would teach the model incorrect classifications and degrade performance. <strong>D is wrong</strong> because temperature affects randomness, not language understanding.'
  },
  {
    id: 19,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'An organization stores sensitive customer data in Amazon S3 and uses it as a data source for an Amazon Bedrock Knowledge Base. A compliance audit requires that the organization prove that no customer data is used by AWS to train or improve foundation models.\n\nHow should the organization respond?',
    options: [
      { letter: 'A', text: 'Explain that Amazon Bedrock does not use customer data to train or improve base foundation models. Customer inputs and outputs are not shared with model providers.' },
      { letter: 'B', text: 'Enable an opt-out flag in the Bedrock console to prevent AWS from using the data for model training.' },
      { letter: 'C', text: 'Use AWS PrivateLink to ensure data never traverses the public internet, which prevents AWS from accessing it.' },
      { letter: 'D', text: 'Encrypt all data with client-side encryption so AWS cannot read the training data.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Amazon Bedrock does not use customer inputs or outputs to train or improve AWS or third-party base foundation models. This is a core data privacy commitment. Customer data stays within the customer\'s AWS account and is not shared with model providers. <strong>B is wrong</strong> because there is no opt-out flag needed — the protection is automatic and on by default. <strong>C is wrong</strong> because PrivateLink controls network routing but is not the mechanism that prevents data usage for training. <strong>D is wrong</strong> because while encryption is good practice, the data privacy guarantee is an architectural and contractual commitment, not dependent on encryption.'
  },
  {
    id: 20,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A development team is using Amazon Bedrock to generate marketing copy. They want the model to produce shorter, punchier responses rather than long paragraphs. The current outputs average 500 tokens.\n\nWhich parameter adjustment will MOST directly control the output length?',
    options: [
      { letter: 'B', text: 'Set maxTokens to 150 to hard-limit the response length.' },
      { letter: 'A', text: 'Set temperature to 0 to make responses more concise.' },
      { letter: 'C', text: 'Set top_p to 0.1 to restrict the vocabulary and produce shorter text.' },
      { letter: 'D', text: 'Add a stop sequence of "\\n\\n" to cut off after the first paragraph.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> The maxTokens parameter directly limits the maximum number of tokens in the generated response. Setting it to 150 ensures the model cannot produce responses longer than that, combined with a system prompt requesting brevity for best results. <strong>A is wrong</strong> because temperature controls randomness, not length — a temperature of 0 produces deterministic output that can still be verbose. <strong>C is wrong</strong> because top_p restricts token sampling probability but does not control response length. <strong>D is wrong</strong> because while stop sequences can truncate output, using "\\n\\n" may cut off mid-thought and does not reliably produce the desired punchy style.'
  },
  {
    id: 21,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A company is evaluating whether to use Amazon Bedrock Knowledge Bases or a custom RAG implementation on Amazon EC2 with LangChain. The company needs automatic document chunking, embedding, vector storage, and retrieval — with minimal operational overhead.\n\nWhich option should the company choose and why?',
    options: [
      { letter: 'C', text: 'Amazon Bedrock Knowledge Bases — it provides a fully managed pipeline for ingestion, chunking, embedding, storage, and retrieval with no infrastructure to manage.' },
      { letter: 'B', text: 'Custom LangChain on EC2 — it provides more flexibility to customize each step of the RAG pipeline.' },
      { letter: 'A', text: 'Amazon Bedrock Knowledge Bases — but only because it is less expensive per query than EC2.' },
      { letter: 'D', text: 'Custom LangChain on EC2 — because Bedrock Knowledge Bases does not support OpenSearch as a vector store.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> Amazon Bedrock Knowledge Bases is a fully managed service that handles the entire RAG pipeline: document ingestion, chunking, embedding generation, vector storage, and retrieval. This minimizes operational overhead since there are no servers to manage, patch, or scale. <strong>B is wrong</strong> because while LangChain offers flexibility, the question prioritizes minimal operational overhead, which a managed service provides. <strong>A is wrong</strong> because the primary advantage is operational simplicity, not necessarily cost per query. <strong>D is wrong</strong> because Bedrock Knowledge Bases does support OpenSearch Serverless as a vector store.'
  },
  {
    id: 22,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A developer is using the Amazon Bedrock Converse API to build a multi-turn chatbot. The chatbot loses context of earlier messages after several turns.\n\nWhat is the MOST likely cause?',
    options: [
      { letter: 'D', text: 'The conversation history is exceeding the model\'s context window. The developer needs to implement conversation summarization or a sliding window over the message history.' },
      { letter: 'B', text: 'The Converse API does not support multi-turn conversations and each call is stateless.' },
      { letter: 'C', text: 'The developer needs to enable session persistence in the Bedrock console.' },
      { letter: 'A', text: 'The maxTokens parameter is too low, preventing the model from reading the full conversation.' }
    ],
    correct: ['D'],
    explanation: '<strong>D is correct.</strong> The Converse API is stateless — the developer must send the full conversation history with each request. After many turns, the total tokens can exceed the model\'s context window, causing older messages to be dropped. Implementing conversation summarization or a sliding window keeps the conversation within limits. <strong>B is wrong</strong> because the Converse API does support multi-turn conversations — the developer passes the message array with alternating user/assistant roles. <strong>C is wrong</strong> because there is no "session persistence" setting in the Bedrock console — state management is the developer\'s responsibility. <strong>D is wrong</strong> because maxTokens controls the output length, not how much input the model can read.'
  },
  {
    id: 23,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A company wants to use Amazon Bedrock to generate product descriptions from structured data (price, features, category). The descriptions must follow a very specific brand voice and format that the base model does not produce.\n\nWhich approach is MOST appropriate?',
    options: [
      { letter: 'A', text: 'Fine-tune the model with labeled examples mapping structured product data to brand-compliant descriptions.' },
      { letter: 'B', text: 'Use continued pre-training with the existing product catalog text.' },
      { letter: 'C', text: 'Use a one-shot prompt with a single example of the desired format.' },
      { letter: 'D', text: 'Use RAG to retrieve similar product descriptions from a Knowledge Base.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Fine-tuning with labeled input-output pairs (structured data → brand-compliant description) teaches the model the specific format, tone, and style required. This is the best approach when you have clear input-output examples and need consistent adherence to a specific output format. <strong>B is wrong</strong> because continued pre-training improves domain vocabulary understanding but does not teach specific input-output format mappings. <strong>C is wrong</strong> because a single example may not be sufficient for the model to reliably replicate a complex brand voice and format across all product types. <strong>D is wrong</strong> because RAG retrieves existing descriptions but does not generate new ones in the correct format for new products.'
  },

  // ─── Domain 2: Implementation & Integration (20 questions, IDs 24–43) ───
  {
    id: 24,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A company purchased Provisioned Throughput for an Amazon Bedrock model. After deployment, the development team reports that their InvokeModel API calls are still being throttled.\n\nWhat is the MOST likely cause?',
    options: [
      { letter: 'B', text: 'The application code is using the base model ID instead of the provisioned model ARN in the InvokeModel requests.' },
      { letter: 'A', text: 'Provisioned Throughput only applies to the Converse API, not InvokeModel.' },
      { letter: 'C', text: 'The Provisioned Throughput commitment has not yet been activated and is still in a pending state.' },
      { letter: 'D', text: 'The application needs to be deployed in the same Availability Zone as the provisioned capacity.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Provisioned Throughput creates a dedicated model endpoint with its own ARN. If the application code continues to use the base model ID (e.g., anthropic.claude-3-sonnet), requests are routed to the on-demand pool and subject to standard throttling limits. The code must be updated to use the provisioned model ARN. <strong>A is wrong</strong> because Provisioned Throughput applies to all Bedrock inference APIs including InvokeModel. <strong>C is wrong</strong> because Provisioned Throughput shows as "Active" once provisioned, and API calls would return an error (not throttling) if the commitment were not ready. <strong>D is wrong</strong> because Bedrock is a regional service — there is no Availability Zone affinity for provisioned capacity.'
  },
  {
    id: 25,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A real-time customer service application must respond to user queries within 3 seconds. The application receives 500 concurrent requests during peak hours and uses Amazon Bedrock for generation.\n\nWhich architecture BEST meets the latency and throughput requirements?',
    options: [
      { letter: 'C', text: 'Use Provisioned Throughput for guaranteed capacity and select a fast model like Claude Haiku. Enable response streaming with InvokeModelWithResponseStream to deliver partial results immediately.' },
      { letter: 'B', text: 'Use on-demand Bedrock with the largest available model and set maxTokens to the maximum for comprehensive responses.' },
      { letter: 'A', text: 'Deploy the model on a SageMaker real-time endpoint with auto-scaling.' },
      { letter: 'D', text: 'Use Amazon Bedrock batch inference to process all 500 requests simultaneously.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> Provisioned Throughput guarantees consistent throughput without throttling at peak loads. A smaller, faster model (like Haiku) has lower latency per request. Response streaming delivers the first tokens immediately, so users see output within seconds even if the full response takes longer. <strong>B is wrong</strong> because on-demand may throttle at 500 concurrent requests, larger models have higher latency, and max tokens increases response time. <strong>A is wrong</strong> because SageMaker endpoints require managing infrastructure and do not provide the same managed experience as Bedrock Provisioned Throughput. <strong>D is wrong</strong> because batch inference is for offline processing and does not meet real-time latency requirements.'
  },
  {
    id: 26,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A data pipeline receives batches of 10,000 documents every hour. Each document must be classified, then summarized, then translated — in sequence. The pipeline must complete within 30 minutes and handle failures gracefully.\n\nWhich AWS architecture is MOST appropriate?',
    options: [
      { letter: 'D', text: 'Use AWS Step Functions with a Map state to process documents in parallel. Each map iteration runs a sequential chain of Lambda functions (classify → summarize → translate) calling Amazon Bedrock.' },
      { letter: 'B', text: 'Use a single Lambda function that loops through all 10,000 documents and calls Bedrock three times per document sequentially.' },
      { letter: 'C', text: 'Use Amazon SQS with three separate queues (classify, summarize, translate) and three Lambda consumers processing in parallel.' },
      { letter: 'A', text: 'Use Amazon EMR with a Spark job that calls Bedrock for each document transformation.' }
    ],
    correct: ['D'],
    explanation: '<strong>D is correct.</strong> Step Functions Map state processes documents in parallel (up to the concurrency limit), with each iteration running the three sequential steps. Step Functions natively handles retries, error handling, and state tracking — meeting both the throughput and failure handling requirements. <strong>B is wrong</strong> because a single Lambda has a 15-minute timeout and cannot process 10,000 documents sequentially within that limit. <strong>C is wrong</strong> because three separate SQS queues require custom coordination to ensure sequential processing per document, adding complexity. <strong>A is wrong</strong> because EMR is designed for big data processing, not API-call-based workflows, and adds unnecessary infrastructure overhead.'
  },
  {
    id: 27,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A company wants to deploy an Amazon Bedrock Agent that can book meetings by checking a user\'s calendar availability and creating calendar events. The calendar system exposes a REST API.\n\nHow should the team configure the agent to interact with the calendar API?',
    options: [
      { letter: 'A', text: 'Create an action group with an OpenAPI schema defining the calendar API operations. Implement a Lambda function that calls the calendar REST API and return results to the agent.' },
      { letter: 'B', text: 'Store the calendar API URL in the agent\'s system prompt and instruct the agent to make HTTP calls directly.' },
      { letter: 'C', text: 'Create a Knowledge Base containing the calendar API documentation so the agent can learn how to call the API.' },
      { letter: 'D', text: 'Fine-tune the agent\'s model on examples of calendar booking conversations.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Bedrock Agents use action groups defined by OpenAPI schemas to interact with external systems. The agent determines when to call an action based on the user\'s intent, and a Lambda function executes the actual API call. This is the standard pattern for connecting agents to external APIs. <strong>B is wrong</strong> because foundation models cannot make HTTP calls — they generate text, not execute code. <strong>C is wrong</strong> because Knowledge Bases provide information retrieval, not API execution capabilities. <strong>D is wrong</strong> because fine-tuning teaches the model patterns but does not give it the ability to execute real API calls.'
  },
  {
    id: 28,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A developer is building a serverless application that uses Amazon Bedrock. The application needs to call the InvokeModel API from an AWS Lambda function. The Lambda function is in a VPC with no internet access.\n\nWhat must the developer do to allow Lambda to reach Bedrock?',
    options: [
      { letter: 'B', text: 'Create a VPC endpoint (PrivateLink) for Amazon Bedrock Runtime and configure the Lambda function\'s security group to allow outbound traffic to the endpoint.' },
      { letter: 'A', text: 'Add a NAT Gateway to the VPC and route traffic to the public Bedrock endpoint.' },
      { letter: 'C', text: 'Move the Lambda function outside the VPC since Bedrock cannot be accessed from within a VPC.' },
      { letter: 'D', text: 'Use AWS Direct Connect to create a dedicated connection between the VPC and Bedrock.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Amazon Bedrock supports VPC endpoints via AWS PrivateLink. Creating a VPC endpoint for the bedrock-runtime service allows the Lambda function to call the InvokeModel API without leaving the VPC, which is the most secure approach. <strong>A is wrong</strong> because while a NAT Gateway would work, it routes traffic over the internet, which may not meet security requirements and adds cost. <strong>C is wrong</strong> because Bedrock can absolutely be accessed from within a VPC via PrivateLink. <strong>D is wrong</strong> because Direct Connect is for connecting on-premises networks to AWS, not for VPC-to-service connectivity.'
  },
  {
    id: 29,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A company is building a generative AI feature within an existing application. The feature must use Amazon Bedrock and support multiple model providers (Anthropic, Amazon, Meta) with the ability to switch between them without code changes.\n\nWhich API should the developer use?',
    options: [
      { letter: 'C', text: 'The Amazon Bedrock Converse API, which provides a unified interface across all supported models.' },
      { letter: 'B', text: 'The Amazon Bedrock InvokeModel API with provider-specific request bodies for each model.' },
      { letter: 'A', text: 'The Amazon Bedrock CreateModelCustomizationJob API to create a unified custom model.' },
      { letter: 'D', text: 'Build a custom abstraction layer that translates requests to each provider\'s native format.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> The Converse API provides a unified, model-agnostic interface for Amazon Bedrock. It uses the same request and response format regardless of the underlying model provider, allowing developers to switch models by changing only the model ID. <strong>B is wrong</strong> because InvokeModel requires provider-specific request body formats, meaning code changes when switching providers. <strong>A is wrong</strong> because model customization creates a fine-tuned model, not a unified API. <strong>D is wrong</strong> because building a custom abstraction layer is unnecessary when the Converse API already provides this capability.'
  },
  {
    id: 30,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A team is using Amazon Bedrock to build a chatbot. During testing, the chatbot sometimes takes 30 seconds to respond for long answers. Users expect to see text appearing progressively rather than waiting for the complete response.\n\nWhat should the team implement?',
    options: [
      { letter: 'D', text: 'Use the InvokeModelWithResponseStream API or the Converse API with streaming enabled to deliver tokens as they are generated.' },
      { letter: 'B', text: 'Set a lower maxTokens value to ensure faster responses.' },
      { letter: 'C', text: 'Use Provisioned Throughput to reduce the response generation time.' },
      { letter: 'A', text: 'Cache common responses in Amazon ElastiCache to avoid calling Bedrock for repeated questions.' }
    ],
    correct: ['D'],
    explanation: '<strong>D is correct.</strong> Response streaming delivers tokens to the client as they are generated, so users see text appearing progressively. This dramatically improves perceived latency even though total generation time is the same. <strong>B is wrong</strong> because lower maxTokens shortens the response but may cut off useful content, and does not improve the progressive display experience. <strong>C is wrong</strong> because Provisioned Throughput improves throughput and consistency but does not fundamentally change the time-to-complete for long responses. <strong>A is wrong</strong> because caching only helps for repeated identical queries and does not solve the general progressive display need.'
  },
  {
    id: 31,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: true,
    text: 'A company is using Amazon Bedrock Agents for an internal helpdesk. The agent must search a Knowledge Base of IT documentation AND create Jira tickets via a REST API when issues cannot be resolved.\n\nWhich TWO configurations must be set up? (Select TWO.)',
    options: [
      { letter: 'C', text: 'Associate the IT documentation Knowledge Base with the agent.' },
      { letter: 'D', text: 'Create an action group with an OpenAPI schema for the Jira ticket creation API and a Lambda function handler.' },
      { letter: 'A', text: 'Create two separate agents — one for Knowledge Base search and one for Jira — and chain them together.' },
      { letter: 'B', text: 'Store the Jira API key in the Knowledge Base as a searchable document.' },
      { letter: 'E', text: 'Fine-tune the agent\'s model on examples of Jira ticket creation.' }
    ],
    correct: ['C', 'D'],
    explanation: '<strong>C is correct.</strong> The agent needs a Knowledge Base association to search IT documentation. Bedrock Agents natively support querying associated Knowledge Bases. <strong>D is correct.</strong> Action groups with OpenAPI schemas are the standard way to connect Bedrock Agents to external APIs. The Lambda function handles the actual Jira API call with proper authentication. <strong>A is wrong</strong> because a single agent can have both Knowledge Base associations and action groups — no need for separate agents. <strong>B is wrong</strong> because API keys are secrets and should never be stored in searchable Knowledge Base documents. <strong>E is wrong</strong> because fine-tuning teaches text patterns but does not give the model the ability to execute API calls.'
  },
  {
    id: 32,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A developer is building a document processing pipeline that needs to extract text from scanned PDF invoices, then use Amazon Bedrock to classify and summarize them.\n\nWhich AWS service should the developer use for text extraction BEFORE sending to Bedrock?',
    options: [
      { letter: 'A', text: 'Amazon Textract to extract text and tables from scanned documents with OCR.' },
      { letter: 'B', text: 'Amazon Comprehend to extract text and identify key phrases from the PDFs.' },
      { letter: 'C', text: 'Amazon Rekognition to detect text within the scanned images.' },
      { letter: 'D', text: 'Amazon Translate to convert the scanned documents into machine-readable text.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Amazon Textract specializes in extracting text, forms, and tables from scanned documents using OCR. It preserves document structure and is the natural choice for processing invoices before sending the extracted text to Bedrock. <strong>B is wrong</strong> because Comprehend analyzes existing text for entities and sentiment — it does not perform OCR on scanned images. <strong>C is wrong</strong> because Rekognition can detect text in images but is designed for photos and scenes, not structured document extraction with tables and forms. <strong>D is wrong</strong> because Translate converts text between languages — it does not perform OCR.'
  },
  {
    id: 33,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A company wants to add AI-powered search to an existing application. The search must support natural language queries over 500,000 documents stored in Amazon S3. The team wants to minimize development effort.\n\nWhich approach is MOST efficient?',
    options: [
      { letter: 'B', text: 'Create an Amazon Bedrock Knowledge Base with an S3 data source and OpenSearch Serverless vector store. Use the Retrieve API for search.' },
      { letter: 'A', text: 'Deploy an open-source vector database on Amazon ECS and build a custom ingestion pipeline with Lambda.' },
      { letter: 'C', text: 'Load all documents into Amazon Kendra and use the Kendra Query API for search.' },
      { letter: 'D', text: 'Store documents in Amazon DynamoDB with full-text search enabled via DynamoDB Streams and OpenSearch.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Amazon Bedrock Knowledge Bases provide a fully managed solution for semantic search over S3 documents. The service handles ingestion, chunking, embedding, and vector storage automatically, minimizing development effort. <strong>A is wrong</strong> because deploying and managing a self-hosted vector database on ECS requires significant development and operational effort. <strong>C is wrong</strong> because while Kendra works, it is a separate enterprise search service with its own pricing model and does not integrate as seamlessly into a Bedrock-based AI application. <strong>D is wrong</strong> because building a custom search pipeline with DynamoDB Streams and OpenSearch requires significant custom development.'
  },
  {
    id: 34,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A team is implementing Amazon Bedrock Prompt Flows to orchestrate a multi-step AI workflow. The flow must: (1) retrieve context from a Knowledge Base, (2) generate a response, and (3) validate the response format with a Lambda function.\n\nHow should the team implement this?',
    options: [
      { letter: 'C', text: 'Create a Prompt Flow with three nodes: a Knowledge Base retrieval node, a prompt node for generation, and a Lambda node for validation — connected sequentially.' },
      { letter: 'B', text: 'Create three separate Bedrock Agents and chain them together using Amazon EventBridge.' },
      { letter: 'A', text: 'Use a single prompt with instructions to perform all three steps internally.' },
      { letter: 'D', text: 'Build the orchestration in AWS Step Functions calling Bedrock APIs at each step.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> Amazon Bedrock Prompt Flows provides a visual node-based interface for orchestrating multi-step AI workflows. It natively supports Knowledge Base retrieval nodes, prompt nodes, and Lambda nodes, making this the purpose-built solution for the described workflow. <strong>B is wrong</strong> because chaining agents via EventBridge adds unnecessary complexity for a sequential workflow that Prompt Flows handles natively. <strong>A is wrong</strong> because a single prompt cannot execute Knowledge Base queries or Lambda function validations. <strong>D is wrong</strong> because while Step Functions could work, Prompt Flows is the Bedrock-native orchestration tool designed specifically for this use case with less code.'
  },
  {
    id: 35,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A company uses Amazon Bedrock and needs to track the number of input and output tokens consumed by each application team for cost allocation. Multiple teams share the same AWS account.\n\nWhat is the MOST effective way to track per-team token usage?',
    options: [
      { letter: 'D', text: 'Enable Amazon Bedrock model invocation logging to Amazon CloudWatch. Use CloudWatch Metrics with dimensions for each team to track token counts.' },
      { letter: 'B', text: 'Create separate AWS accounts for each team and use AWS Organizations consolidated billing.' },
      { letter: 'C', text: 'Build a custom middleware that counts tokens before and after each Bedrock API call and writes to a DynamoDB table.' },
      { letter: 'A', text: 'Use AWS Cost Explorer tags to attribute Bedrock costs to each team.' }
    ],
    correct: ['D'],
    explanation: '<strong>D is correct.</strong> Amazon Bedrock model invocation logging sends detailed logs including input and output token counts to CloudWatch. Using CloudWatch dimensions or log filtering, the team can break down token usage per application or team. <strong>B is wrong</strong> because creating separate AWS accounts is a heavy-weight solution for what is a monitoring and logging concern. <strong>C is wrong</strong> because building custom token counting middleware duplicates functionality already provided by Bedrock invocation logging. <strong>A is wrong</strong> because while Cost Explorer shows Bedrock costs, it does not provide token-level granularity per team within a shared account without additional logging.'
  },
  {
    id: 36,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A startup wants to build a prototype chatbot using Amazon Bedrock as quickly as possible. The chatbot needs to converse naturally, use a Knowledge Base, and be embeddable in their website. The startup has limited engineering resources.\n\nWhich approach requires the LEAST development effort?',
    options: [
      { letter: 'A', text: 'Use the Amazon Bedrock console to create an Agent with a Knowledge Base association, then deploy using the provided web UI widget.' },
      { letter: 'B', text: 'Write a custom React application that calls the Bedrock Converse API and implements RAG logic with the Retrieve API.' },
      { letter: 'C', text: 'Use Amazon Lex to build the chatbot and integrate it with Bedrock via Lambda.' },
      { letter: 'D', text: 'Deploy an open-source chatbot framework on AWS Amplify and configure it to call Bedrock.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Amazon Bedrock Agents can be created through the console with Knowledge Base integration and deployed with minimal code. This requires the least engineering effort for a prototype. <strong>B is wrong</strong> because building a custom React app with RAG logic requires significant frontend and backend development. <strong>C is wrong</strong> because Lex adds unnecessary complexity for a simple chatbot that Bedrock Agents can handle directly. <strong>D is wrong</strong> because deploying and configuring an open-source framework requires more development effort than using the managed Bedrock Agent solution.'
  },
  {
    id: 37,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'An e-commerce company uses Amazon Bedrock to generate product descriptions. They want to ensure the model never includes competitor brand names in the generated descriptions.\n\nWhich approach is MOST reliable?',
    options: [
      { letter: 'B', text: 'Configure an Amazon Bedrock Guardrail with a denied topics policy that filters out competitor brand names from both input and output.' },
      { letter: 'A', text: 'Add a system prompt instruction: "Never mention competitor brands."' },
      { letter: 'C', text: 'Fine-tune the model on product descriptions that do not contain competitor names.' },
      { letter: 'D', text: 'Use a regular expression filter in the application code to strip competitor names after generation.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Amazon Bedrock Guardrails provides configurable content filters including word-level filters and denied topics that reliably block specific terms from appearing in model outputs. This is a systematic, policy-based approach. <strong>A is wrong</strong> because system prompts are suggestive, not deterministic — models can still occasionally include prohibited terms. <strong>C is wrong</strong> because fine-tuning reduces but does not eliminate the chance of competitor names appearing. <strong>D is wrong</strong> because regex filtering is reactive and brittle — it may miss variations, abbreviations, or new competitor names not in the filter list.'
  },
  {
    id: 38,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A company processes insurance claims using Amazon Bedrock. The workflow requires: (1) extracting data from claim forms, (2) looking up policy details from a database, (3) generating a claim assessment. Each step depends on the previous step\'s output.\n\nWhich service is BEST for orchestrating this workflow?',
    options: [
      { letter: 'C', text: 'Amazon Bedrock Agents with action groups for data extraction and database lookup, using the agent\'s built-in orchestration.' },
      { letter: 'B', text: 'AWS Step Functions with sequential Lambda tasks for each processing step.' },
      { letter: 'A', text: 'Amazon SQS with three separate queues and Lambda consumers.' },
      { letter: 'D', text: 'A single Lambda function that performs all three steps sequentially.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> Amazon Bedrock Agents excel at multi-step reasoning workflows. The agent can use action groups (backed by Lambda) to extract form data and query the database, then use its built-in reasoning to generate the claim assessment — all orchestrated automatically based on the task. <strong>B is wrong</strong> because while Step Functions works for fixed sequential workflows, a Bedrock Agent provides more intelligent, dynamic orchestration with built-in reasoning. <strong>A is wrong</strong> because SQS queues add asynchronous complexity to what should be a synchronous, sequential workflow. <strong>D is wrong</strong> because a single Lambda function tightly couples all logic, has timeout limitations, and is harder to maintain.'
  },
  {
    id: 39,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A development team notices that their Amazon Bedrock application has inconsistent response times. Some requests complete in 2 seconds while others take 15 seconds, even with identical input. The team is using on-demand pricing.\n\nWhat is the MOST likely explanation?',
    options: [
      { letter: 'D', text: 'On-demand inference shares capacity across customers. Variable load from other users causes inconsistent latency. Provisioned Throughput would provide more consistent performance.' },
      { letter: 'B', text: 'The model randomly varies its processing speed based on an internal randomness parameter.' },
      { letter: 'C', text: 'The application\'s network connection to Bedrock is unstable.' },
      { letter: 'A', text: 'Different AWS Regions have different processing speeds for the same model.' }
    ],
    correct: ['D'],
    explanation: '<strong>D is correct.</strong> On-demand Bedrock inference is a shared, multi-tenant service. During periods of high demand from other customers, individual requests may experience queuing and variable latency. Provisioned Throughput provides dedicated capacity, resulting in more consistent response times. <strong>B is wrong</strong> because models do not randomly vary processing speed — latency is determined by input/output length and available compute. <strong>C is wrong</strong> because while network issues can cause latency, the pattern of consistent input with variable latency points to server-side capacity sharing. <strong>A is wrong</strong> because the question describes variation within the same application, not cross-region comparison.'
  },
  {
    id: 40,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A company wants to use Amazon Bedrock to analyze images of manufacturing defects. The production line camera captures 100 images per minute and each image must be classified within 5 seconds.\n\nWhich architecture should the team use?',
    options: [
      { letter: 'A', text: 'Stream images to an Amazon Kinesis Data Stream. Use a Lambda consumer that calls the Bedrock Converse API with a multimodal model (Claude Sonnet) to classify each image.' },
      { letter: 'B', text: 'Store images in S3 and use an S3 event-triggered Lambda to call Amazon Rekognition for classification.' },
      { letter: 'C', text: 'Batch all images hourly and use Bedrock batch inference for classification.' },
      { letter: 'D', text: 'Send images directly from the camera to the Bedrock InvokeModel API over the internet.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Kinesis Data Streams handles the high-throughput image ingestion (100/minute), and Lambda with Bedrock\'s multimodal Converse API can classify each image using a model like Claude Sonnet that understands images. The stream buffer ensures no images are lost if processing temporarily falls behind. <strong>B is wrong</strong> because Rekognition provides pre-built image analysis but may not understand manufacturing-specific defect classifications without custom labels training. <strong>C is wrong</strong> because hourly batching does not meet the 5-second classification requirement. <strong>D is wrong</strong> because sending directly from the camera bypasses buffering, has no retry mechanism, and exposes the Bedrock endpoint directly to the production network.'
  },
  {
    id: 41,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A team is developing an Amazon Bedrock application that needs to call the same model multiple times within a single request to refine an answer. The first call generates a draft, the second call critiques it, and the third call produces the final version.\n\nWhich implementation pattern is MOST appropriate?',
    options: [
      { letter: 'B', text: 'Implement a prompt chain in the application code: call the Converse API three times sequentially, passing each output as input to the next call.' },
      { letter: 'A', text: 'Use a single Converse API call with a very detailed system prompt that instructs the model to draft, critique, and finalize in one response.' },
      { letter: 'C', text: 'Create three separate fine-tuned models — one for drafting, one for critiquing, and one for finalizing.' },
      { letter: 'D', text: 'Use Amazon Bedrock batch inference to run all three steps simultaneously.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Prompt chaining is the standard pattern for multi-step reasoning. Each Converse API call receives the output of the previous step, allowing the model to focus on one task at a time. This produces better results than trying to combine all steps into one prompt. <strong>A is wrong</strong> because combining all steps into one prompt reduces quality — the model tends to produce a single blended response rather than genuinely separate draft, critique, and final steps. <strong>C is wrong</strong> because creating three fine-tuned models is excessive when the same model can perform all three tasks via different prompts. <strong>D is wrong</strong> because batch inference is for processing many independent inputs offline, and the three steps are sequential, not parallel.'
  },
  {
    id: 42,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A company wants to migrate their existing OpenAI-based application to Amazon Bedrock with minimal code changes. The application uses the OpenAI Python SDK extensively.\n\nWhat is the MOST efficient migration path?',
    options: [
      { letter: 'A', text: 'Rewrite all API calls to use the AWS SDK for Python (boto3) with the Bedrock Runtime client and the Converse API.' },
      { letter: 'C', text: 'Use the Amazon Bedrock Converse API which has a similar message-based interface, and update the SDK client and model ID references.' },
      { letter: 'B', text: 'Deploy a proxy layer that translates OpenAI API format to Bedrock API format so the application code remains unchanged.' },
      { letter: 'D', text: 'Fine-tune a Bedrock model to respond identically to OpenAI models so the application behavior remains the same.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> The Bedrock Converse API uses a similar message-based interface (system, user, assistant roles) to OpenAI\'s Chat Completions API. The migration primarily involves changing the SDK client initialization and model ID references while keeping the overall conversation structure similar. <strong>A is wrong</strong> because it describes the same approach but implies more work — the Converse API is specifically designed to be model-agnostic and familiar. <strong>C is wrong</strong> because while a proxy could work, it adds an unnecessary service layer to maintain. <strong>D is wrong</strong> because fine-tuning changes model behavior, not API compatibility.'
  },
  {
    id: 43,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A company is building a customer-facing chatbot with Amazon Bedrock. The chatbot must maintain conversation context across multiple browser sessions. Users should be able to close the browser and resume the conversation later.\n\nHow should the team implement session persistence?',
    options: [
      { letter: 'D', text: 'Store the conversation message history in Amazon DynamoDB keyed by a session ID. On each new request, load the history from DynamoDB and pass it to the Converse API.' },
      { letter: 'B', text: 'Enable session persistence in the Bedrock console for the model.' },
      { letter: 'C', text: 'Use browser localStorage to save the conversation and send it with each request.' },
      { letter: 'A', text: 'Configure an Amazon ElastiCache Redis cluster to store conversation state with TTL expiration.' }
    ],
    correct: ['D'],
    explanation: '<strong>D is correct.</strong> The Bedrock Converse API is stateless — the developer must manage conversation history. DynamoDB provides durable, scalable storage for conversation histories keyed by session or user ID. Loading and passing the history with each API call maintains context across sessions. <strong>B is wrong</strong> because there is no session persistence setting in the Bedrock console — Bedrock APIs are stateless by design. <strong>C is wrong</strong> because localStorage is device-specific, has size limits, and is not durable across browser clears. <strong>A is wrong</strong> because while ElastiCache provides fast in-memory storage, it is volatile and data can be lost; DynamoDB provides durable persistence.'
  },

  // ─── Domain 3: Safety, Security & Governance (15 questions, IDs 44–58) ───
  {
    id: 44,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A large enterprise with multiple AWS accounts uses AWS Organizations. The security team wants to prevent any account in the development OU from invoking Amazon Bedrock foundation models or creating model customization jobs.\n\nWhat is the MOST effective way to enforce this?',
    options: [
      { letter: 'A', text: 'Attach a Service Control Policy (SCP) to the development OU that denies all bedrock:* actions.' },
      { letter: 'B', text: 'Remove IAM permissions for Bedrock from all IAM users and roles in the development accounts.' },
      { letter: 'C', text: 'Disable the Amazon Bedrock service in each development account via the AWS Organizations console.' },
      { letter: 'D', text: 'Create an AWS Config rule that detects Bedrock API calls and triggers a remediation Lambda.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Service Control Policies (SCPs) in AWS Organizations set permission guardrails that apply to all principals in the target OU. Attaching an SCP that denies bedrock:* to the development OU prevents any user or role from invoking Bedrock, regardless of their IAM permissions. <strong>B is wrong</strong> because manually removing IAM permissions from all users and roles is error-prone and does not prevent new roles from being created with Bedrock access. <strong>C is wrong</strong> because AWS Organizations does not have a per-service disable feature for individual accounts. <strong>D is wrong</strong> because a Config rule with remediation is reactive (detect-and-fix), not preventive — the API call would still succeed initially.'
  },
  {
    id: 45,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A company uses AWS Control Tower to manage a multi-account environment. They want to enable Amazon Bedrock for production accounts but block it in sandbox accounts, while maintaining centralized governance.\n\nWhich approach aligns with Control Tower best practices?',
    options: [
      { letter: 'B', text: 'Create a custom Control Tower guardrail (SCP-based) that denies Bedrock actions and apply it to the sandbox OU.' },
      { letter: 'A', text: 'Modify the Control Tower landing zone configuration to disable Bedrock globally, then add exceptions for production accounts.' },
      { letter: 'C', text: 'Use AWS Config conformance packs in Control Tower to monitor and alert on Bedrock usage in sandbox accounts.' },
      { letter: 'D', text: 'Create IAM permission boundaries in the Control Tower account factory template to restrict Bedrock access.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Control Tower supports custom guardrails implemented as SCPs. Creating a preventive guardrail that denies Bedrock actions and applying it to the sandbox OU is the standard Control Tower approach for restricting services per OU. <strong>A is wrong</strong> because Control Tower does not have a per-service disable feature in the landing zone configuration. <strong>C is wrong</strong> because Config conformance packs are detective (monitoring and alerting), not preventive — they do not block access. <strong>D is wrong</strong> because IAM permission boundaries apply per-principal and are harder to manage at scale compared to OU-level SCPs.'
  },
  {
    id: 46,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'An organization needs to set up a data lake for AI/ML workloads. Multiple teams need access to different datasets stored in Amazon S3. Some datasets contain PII and must be restricted to specific teams with row and column-level access controls.\n\nWhich service should the organization use for centralized data governance?',
    options: [
      { letter: 'C', text: 'AWS Lake Formation with fine-grained access control policies that restrict access at the row and column level.' },
      { letter: 'B', text: 'Amazon S3 bucket policies with prefix-based access restrictions for each team.' },
      { letter: 'A', text: 'AWS IAM policies attached to each team\'s roles with resource-level permissions on S3 objects.' },
      { letter: 'D', text: 'Amazon Macie to automatically detect and restrict access to PII data in the data lake.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> AWS Lake Formation provides centralized governance for data lakes with fine-grained access controls including row-level and column-level security. It integrates with the AWS Glue Data Catalog and allows administrators to define granular permissions per principal, per table, down to specific rows and columns. <strong>B is wrong</strong> because S3 bucket policies operate at the object/prefix level and cannot provide row or column-level access control within files. <strong>A is wrong</strong> because IAM policies can control S3 object access but cannot enforce row/column-level restrictions within data files. <strong>D is wrong</strong> because Macie detects sensitive data but does not enforce access controls — it is a discovery tool, not a governance tool.'
  },
  {
    id: 47,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A healthcare company uses Amazon Bedrock for patient communication. They need to ensure the model never generates medical diagnoses, never reveals patient names in responses, and blocks any input that asks for prescription recommendations.\n\nWhich feature should the company configure?',
    options: [
      { letter: 'D', text: 'Amazon Bedrock Guardrails with denied topics for medical diagnoses and prescriptions, plus PII filters for patient names.' },
      { letter: 'B', text: 'A system prompt that instructs the model to avoid medical diagnoses, prescriptions, and patient names.' },
      { letter: 'C', text: 'Fine-tune the model to never produce medical diagnoses or patient information.' },
      { letter: 'A', text: 'Amazon Comprehend Medical to filter the model\'s output for medical entities before returning to the user.' }
    ],
    correct: ['D'],
    explanation: '<strong>D is correct.</strong> Amazon Bedrock Guardrails provides configurable content filtering including denied topics (blocks specific subject areas), word filters, and PII detection/redaction. Configuring denied topics for diagnoses and prescriptions, plus PII filters for names, provides reliable, policy-enforced protection. <strong>B is wrong</strong> because system prompts are best-effort and models can still produce prohibited content. <strong>C is wrong</strong> because fine-tuning reduces but cannot guarantee elimination of prohibited content. <strong>A is wrong</strong> because Comprehend Medical identifies medical entities but does not filter or block content — it is an analysis tool, not a content filter.'
  },
  {
    id: 48,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A company has an S3 bucket with documents organized by department: s3://docs/finance/, s3://docs/legal/, s3://docs/engineering/. Each department has its own Amazon Bedrock Knowledge Base application. The company needs to ensure that the finance team\'s Knowledge Base can only retrieve documents from the finance prefix.\n\nHow should this be implemented?',
    options: [
      { letter: 'A', text: 'Create separate Knowledge Base data sources for each department, each pointing to their specific S3 prefix. Configure each application to use only its department\'s Knowledge Base.' },
      { letter: 'B', text: 'Create one Knowledge Base with all documents. Use S3 bucket policies to restrict read access by IAM role per prefix.' },
      { letter: 'C', text: 'Add department metadata to each document and use metadata filtering in the Retrieve API to restrict results per department at query time.' },
      { letter: 'D', text: 'Create one Knowledge Base and rely on the model\'s system prompt to only return results from the correct department.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Creating separate data sources per department prefix ensures physical isolation — each Knowledge Base only ingests and indexes documents from its designated prefix. The application for each department uses its own Knowledge Base, making cross-department access impossible at the data layer. <strong>B is wrong</strong> because S3 bucket policies control who can read S3 objects, not what the Knowledge Base retrieves — once ingested, all documents are in the same vector store. <strong>C is wrong</strong> because metadata filtering depends on query-time parameters that could be bypassed or misconfigured by the application. <strong>D is wrong</strong> because system prompts cannot reliably prevent the retrieval engine from returning documents from other departments.'
  },
  {
    id: 49,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'An AI governance team needs to audit all Amazon Bedrock model invocations across the organization. They need to capture which models were called, the input prompts, and the generated responses for compliance review.\n\nWhich feature should they enable?',
    options: [
      { letter: 'B', text: 'Amazon Bedrock model invocation logging with full request and response logging to Amazon S3 and CloudWatch Logs.' },
      { letter: 'A', text: 'AWS CloudTrail data events for Amazon Bedrock to capture all API calls.' },
      { letter: 'C', text: 'Amazon Bedrock model evaluation jobs to periodically assess model outputs.' },
      { letter: 'D', text: 'VPC Flow Logs to monitor network traffic between the application and Bedrock endpoints.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Amazon Bedrock model invocation logging captures detailed information about each model call, including the full input prompt and generated response. Logs can be sent to S3 for long-term storage and CloudWatch Logs for real-time analysis. <strong>A is wrong</strong> because CloudTrail captures API management events (who called what API) but does not capture the actual prompt content or model responses. <strong>C is wrong</strong> because model evaluation jobs assess model quality, not individual invocation auditing. <strong>D is wrong</strong> because VPC Flow Logs capture network metadata (IPs, ports) but not application-level content like prompts and responses.'
  },
  {
    id: 50,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A company is concerned about prompt injection attacks on their Amazon Bedrock-powered customer service chatbot. An attacker could craft an input that tricks the model into revealing system prompt instructions or executing unintended actions.\n\nWhich approach BEST mitigates prompt injection risks?',
    options: [
      { letter: 'C', text: 'Apply Amazon Bedrock Guardrails with input content filters and denied topics. Additionally, validate and sanitize user inputs in the application layer before sending to the model.' },
      { letter: 'B', text: 'Make the system prompt very long and complex so attackers cannot guess its structure.' },
      { letter: 'A', text: 'Set the temperature to 0 to prevent the model from following unexpected instructions.' },
      { letter: 'D', text: 'Use a smaller model that is less capable of following complex injection prompts.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> A defense-in-depth approach combining Bedrock Guardrails (which filter harmful inputs and outputs) with application-layer input validation provides the strongest protection against prompt injection. Guardrails can block specific attack patterns, while application validation catches known injection techniques. <strong>B is wrong</strong> because prompt complexity does not prevent injection — sophisticated attacks can override instructions regardless of system prompt length. <strong>A is wrong</strong> because temperature controls randomness, not instruction following — a model at temperature 0 still follows injected instructions. <strong>D is wrong</strong> because even smaller models can be manipulated by prompt injection attacks.'
  },
  {
    id: 51,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: true,
    text: 'A company needs to ensure their Amazon Bedrock application meets SOC 2 compliance requirements. The compliance officer needs to verify data encryption, access logging, and network isolation.\n\nWhich TWO configurations satisfy these requirements? (Select TWO.)',
    options: [
      { letter: 'A', text: 'Enable AWS CloudTrail for Bedrock API calls and enable Bedrock model invocation logging for detailed audit trails.' },
      { letter: 'C', text: 'Create VPC endpoints for Bedrock Runtime and configure security groups to restrict access to authorized VPC resources only.' },
      { letter: 'B', text: 'Purchase a Bedrock Enterprise license that includes automatic SOC 2 certification.' },
      { letter: 'D', text: 'Deploy Bedrock in a dedicated tenancy account to isolate from other AWS customers.' },
      { letter: 'E', text: 'Configure Amazon Inspector to scan Bedrock for security vulnerabilities.' }
    ],
    correct: ['A', 'C'],
    explanation: '<strong>A is correct.</strong> CloudTrail provides access logging for all Bedrock API calls (who, when, what), and model invocation logging captures detailed request/response data. Together, they satisfy the audit trail requirement. <strong>C is correct.</strong> VPC endpoints via PrivateLink ensure Bedrock traffic stays within the AWS private network, not traversing the internet. Security groups provide network-level access control. Bedrock already encrypts data in transit (TLS) and at rest. <strong>B is wrong</strong> because there is no "Bedrock Enterprise license" — Bedrock is available through standard AWS accounts. <strong>D is wrong</strong> because Bedrock is a managed multi-tenant service; dedicated tenancy is not available or necessary for SOC 2. <strong>E is wrong</strong> because Amazon Inspector scans EC2 instances, Lambda functions, and container images for vulnerabilities — it does not scan managed services like Bedrock.'
  },
  {
    id: 52,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A company is deploying Amazon Bedrock Guardrails for their customer-facing application. They want to prevent the model from generating content about competitor products, block profanity, and redact any PII in the output.\n\nHow many Guardrail policies does the team need to configure?',
    options: [
      { letter: 'D', text: 'One Guardrail with three policy types: denied topics for competitors, word filters for profanity, and sensitive information filters for PII.' },
      { letter: 'B', text: 'Three separate Guardrails — one for each policy type — applied in sequence.' },
      { letter: 'C', text: 'One Guardrail with a single custom content filter that handles all three requirements.' },
      { letter: 'A', text: 'Three separate Guardrails combined into a Guardrail chain via Amazon EventBridge.' }
    ],
    correct: ['D'],
    explanation: '<strong>D is correct.</strong> A single Amazon Bedrock Guardrail can contain multiple policy types simultaneously: denied topics, word filters, and sensitive information (PII) filters. All policies are evaluated on each request, providing comprehensive protection within a single Guardrail configuration. <strong>B is wrong</strong> because you cannot chain multiple Guardrails on a single model invocation — one Guardrail is applied per call. <strong>C is wrong</strong> because these are distinct policy types (denied topics, word filters, PII), not a single custom filter. <strong>A is wrong</strong> because Guardrail chaining via EventBridge is not a supported feature.'
  },
  {
    id: 53,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'AWS Lake Formation is being used to govern data access for an ML training pipeline. A data scientist needs read access to a specific table but should only see rows where region = "US" and should not see the social_security_number column.\n\nHow should the Lake Formation administrator configure this?',
    options: [
      { letter: 'A', text: 'Create a Lake Formation data filter that excludes the social_security_number column and includes only rows where region = "US". Grant the data scientist table access through this filter.' },
      { letter: 'B', text: 'Create a new table view in Amazon Athena that filters rows and excludes the column, then grant the data scientist access to the view.' },
      { letter: 'C', text: 'Use IAM policies to restrict which columns the data scientist can query via Athena.' },
      { letter: 'D', text: 'Create a separate copy of the table in S3 with the PII column removed and US-only rows, then grant access to the copy.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Lake Formation data filters support both column-level exclusion and row-level filtering using cell-level security. The administrator can define a filter that excludes specific columns and includes only rows matching a condition, then grant table access through that filter. <strong>B is wrong</strong> because Athena views do not enforce row/column security at the governance layer — they can be bypassed by querying the underlying table directly. <strong>C is wrong</strong> because IAM policies cannot enforce column-level or row-level access for data lake queries. <strong>D is wrong</strong> because creating data copies is operationally expensive, error-prone, and does not provide centralized governance.'
  },
  {
    id: 54,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A company uses Amazon Bedrock and wants to implement the principle of least privilege for their development teams. Team A should only be able to invoke Claude models, while Team B should only be able to invoke Titan models.\n\nHow should the IAM policies be configured?',
    options: [
      { letter: 'B', text: 'Create IAM policies with Condition keys that restrict bedrock:InvokeModel to specific model IDs. Attach the Claude-only policy to Team A\'s role and the Titan-only policy to Team B\'s role.' },
      { letter: 'A', text: 'Create separate AWS accounts for each team — one with only Claude enabled and one with only Titan enabled.' },
      { letter: 'C', text: 'Use Amazon Bedrock Guardrails to route Team A to Claude and Team B to Titan.' },
      { letter: 'D', text: 'Create separate VPCs for each team with VPC endpoints configured for specific models.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> IAM policies support resource-level permissions for Bedrock model invocation. Using the resource ARN or condition keys to restrict which models a role can invoke implements least privilege at the identity layer. <strong>A is wrong</strong> because creating separate accounts is excessive for what can be achieved with IAM policies. <strong>C is wrong</strong> because Guardrails filter content, not model access — they cannot restrict which models a user can invoke. <strong>D is wrong</strong> because VPC endpoints provide network-level connectivity, not model-level access control.'
  },
  {
    id: 55,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A company building a generative AI application wants to assess the potential risks of their AI system, including bias, fairness, and potential for harmful outputs, BEFORE deploying to production.\n\nWhich approach aligns with AWS responsible AI best practices?',
    options: [
      { letter: 'C', text: 'Use Amazon Bedrock model evaluation to run automated assessments against test datasets, supplemented with human evaluation for subjective quality criteria.' },
      { letter: 'B', text: 'Deploy to production with monitoring and fix issues as they are reported by users.' },
      { letter: 'A', text: 'Run the application through Amazon Inspector to identify security vulnerabilities.' },
      { letter: 'D', text: 'Use AWS Trusted Advisor to check for AI best practice violations.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> Amazon Bedrock model evaluation supports both automatic evaluation (using metrics like accuracy, toxicity, robustness) and human evaluation workflows. Running evaluations before deployment is an AWS responsible AI best practice for identifying bias, fairness issues, and harmful outputs. <strong>B is wrong</strong> because deploying without pre-production evaluation exposes users to potential harms and violates responsible AI principles. <strong>A is wrong</strong> because Inspector identifies software security vulnerabilities, not AI-specific risks like bias or harmful outputs. <strong>D is wrong</strong> because Trusted Advisor checks for AWS infrastructure best practices (cost, security, performance), not AI-specific risks.'
  },
  {
    id: 56,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'An enterprise wants to track data lineage for their AI/ML pipeline. They need to know which S3 datasets were used to train each model, which models were used in which applications, and maintain an audit trail of all data transformations.\n\nWhich combination of AWS services provides this capability?',
    options: [
      { letter: 'A', text: 'AWS Lake Formation for data catalog and access governance, plus AWS CloudTrail for API-level audit trails of data access and model operations.' },
      { letter: 'B', text: 'Amazon S3 versioning to track all changes to training data files.' },
      { letter: 'D', text: 'Amazon SageMaker ML Lineage Tracking to record the relationships between datasets, models, and endpoints.' },
      { letter: 'C', text: 'AWS Config to record resource configuration changes across the pipeline.' }
    ],
    correct: ['D'],
    explanation: '<strong>D is correct.</strong> Amazon SageMaker ML Lineage Tracking is purpose-built for tracking the full lineage of ML artifacts: datasets, training jobs, models, and deployed endpoints. It records relationships and dependencies across the entire ML pipeline. <strong>A is wrong</strong> because Lake Formation manages data governance and CloudTrail tracks API calls, but neither provides artifact-level ML lineage tracking. <strong>B is wrong</strong> because S3 versioning tracks file versions but does not record relationships between datasets, models, and applications. <strong>C is wrong</strong> because AWS Config tracks resource configuration changes but does not provide ML-specific lineage tracking.'
  },
  {
    id: 57,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A company wants to share an Amazon Bedrock custom model with a partner organization in a separate AWS account while maintaining control over who can use it.\n\nWhat is the recommended approach?',
    options: [
      { letter: 'A', text: 'Use Amazon Bedrock model sharing to grant cross-account access via resource-based policies, specifying the partner\'s AWS account ID.' },
      { letter: 'B', text: 'Export the model weights to S3 and share the S3 bucket with the partner account.' },
      { letter: 'C', text: 'Create an IAM role in the partner account with access to the model in the source account.' },
      { letter: 'D', text: 'Copy the custom model to the partner\'s account using the Bedrock CreateModelCopy API.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Amazon Bedrock supports cross-account model sharing through resource-based policies. The model owner can grant specific AWS accounts permission to invoke the custom model while retaining full control and the ability to revoke access. <strong>B is wrong</strong> because Bedrock does not support exporting model weights — custom models are managed within the Bedrock service. <strong>C is wrong</strong> because cross-account IAM roles do not directly work for Bedrock custom model access without resource-based policies on the model itself. <strong>D is wrong</strong> because CreateModelCopy creates a copy that the partner would own and the original owner could not control or revoke.'
  },
  {
    id: 58,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A regulated financial institution uses Amazon Bedrock. Their compliance team requires that all model inference requests and responses be retained for 7 years and be immutable to prevent tampering.\n\nWhich storage configuration meets these requirements?',
    options: [
      { letter: 'B', text: 'Enable Bedrock model invocation logging to an S3 bucket configured with S3 Object Lock in compliance mode with a 7-year retention period.' },
      { letter: 'A', text: 'Enable Bedrock model invocation logging to CloudWatch Logs with a 7-year retention period.' },
      { letter: 'C', text: 'Enable Bedrock model invocation logging to an S3 bucket with standard storage class and a lifecycle rule to move to Glacier after 30 days.' },
      { letter: 'D', text: 'Use AWS Backup to create daily snapshots of the Bedrock service configuration.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> S3 Object Lock in compliance mode provides WORM (Write Once Read Many) protection that prevents deletion or modification for the specified retention period. Combined with Bedrock model invocation logging, this creates an immutable, tamper-proof audit trail for 7 years. <strong>A is wrong</strong> because CloudWatch Logs retention prevents deletion after the period, but does not provide the same immutability guarantees as S3 Object Lock compliance mode. <strong>C is wrong</strong> because standard S3 without Object Lock allows deletion and modification, violating the immutability requirement. <strong>D is wrong</strong> because AWS Backup does not support backing up Bedrock invocation logs or service configurations.'
  },

  // ─── Domain 4: Operational Efficiency (9 questions, IDs 59–67) ───
  {
    id: 59,
    domain: 'D4',
    domainName: 'Operational Efficiency',
    multi: false,
    text: 'A company manages 50 different prompts across multiple Amazon Bedrock applications. Different teams frequently update prompts, leading to version conflicts and no way to track which prompt version is in production.\n\nWhich solution provides centralized prompt management?',
    options: [
      { letter: 'C', text: 'Use Amazon Bedrock Prompt Management to create, version, and manage all prompts centrally. Use prompt ARNs in application code to reference specific versions.' },
      { letter: 'B', text: 'Store all prompts in a shared Amazon S3 bucket organized by team and version folders.' },
      { letter: 'A', text: 'Use AWS Systems Manager Parameter Store to store prompt strings as secure parameters.' },
      { letter: 'D', text: 'Create a DynamoDB table with prompt text, version numbers, and team ownership fields.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> Amazon Bedrock Prompt Management provides a purpose-built service for creating, versioning, and managing prompts. Prompts are versioned with ARNs, enabling applications to reference specific versions and teams to iterate without affecting production. <strong>B is wrong</strong> because S3 provides storage but not versioning workflow, prompt-specific features, or integration with Bedrock. <strong>A is wrong</strong> because Parameter Store stores configuration values but lacks prompt-specific features like testing, comparison, and Bedrock integration. <strong>D is wrong</strong> because DynamoDB provides custom storage but requires building all management, versioning, and access control logic from scratch.'
  },
  {
    id: 60,
    domain: 'D4',
    domainName: 'Operational Efficiency',
    multi: false,
    text: 'A team wants to compare two different prompt versions for a customer support chatbot before deploying the winner to production. They need to evaluate response quality, helpfulness, and accuracy using both automated metrics and human judgment.\n\nWhat is the MOST efficient approach?',
    options: [
      { letter: 'D', text: 'Use Amazon Bedrock model evaluation with both automatic evaluation (using a judge model) and human evaluation workflows to compare the two prompt versions against a test dataset.' },
      { letter: 'B', text: 'Deploy both versions to production with 50/50 traffic split and collect user feedback for 2 weeks.' },
      { letter: 'C', text: 'Have team members manually test both prompts with 10 sample queries and choose the one that feels better.' },
      { letter: 'A', text: 'Run both prompts through Amazon Comprehend sentiment analysis and choose the one with higher positive sentiment scores.' }
    ],
    correct: ['D'],
    explanation: '<strong>D is correct.</strong> Amazon Bedrock model evaluation supports both automatic evaluation (using metrics like accuracy, helpfulness, toxicity scored by a judge model) and human evaluation workflows where reviewers rate responses. This provides rigorous, structured comparison before deployment. <strong>B is wrong</strong> because deploying untested prompts to production exposes real users to potentially worse experiences. <strong>C is wrong</strong> because manual testing with a small sample is not statistically rigorous and is prone to bias. <strong>A is wrong</strong> because sentiment analysis measures emotional tone, not helpfulness, accuracy, or response quality for customer support.'
  },
  {
    id: 61,
    domain: 'D4',
    domainName: 'Operational Efficiency',
    multi: false,
    text: 'A company runs Amazon Bedrock workloads with predictable daily patterns: high usage during business hours (8 AM - 6 PM) and minimal usage overnight. They want to optimize costs while maintaining performance during peak hours.\n\nWhich pricing strategy is MOST cost-effective?',
    options: [
      { letter: 'A', text: 'Purchase Provisioned Throughput with a 1-month commitment for the peak capacity needed during business hours.' },
      { letter: 'B', text: 'Use on-demand pricing for all requests, as it automatically scales with demand.' },
      { letter: 'C', text: 'Purchase Provisioned Throughput for a baseline capacity and use on-demand for overflow during peak hours.' },
      { letter: 'D', text: 'Purchase Provisioned Throughput with no commitment (hourly) for business hours and delete it each evening.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> With predictable daily usage, a 1-month Provisioned Throughput commitment provides a significant discount over on-demand pricing. Since the company knows their peak capacity needs, provisioning for peak hours and having idle capacity overnight is still more cost-effective than on-demand pricing at high volume. <strong>B is wrong</strong> because on-demand pricing at high volume during business hours is significantly more expensive than committed Provisioned Throughput. <strong>C is wrong</strong> because while this approach works, the question asks for MOST cost-effective — splitting between provisioned and on-demand is less cost-effective than a committed provisioned plan when usage is predictable. <strong>D is wrong</strong> because no-commitment hourly Provisioned Throughput is more expensive than committed pricing, and the overhead of creating/deleting daily adds operational complexity.'
  },
  {
    id: 62,
    domain: 'D4',
    domainName: 'Operational Efficiency',
    multi: false,
    text: 'A team maintains an Amazon Bedrock application and wants to be alerted when the model\'s response quality degrades over time — for example, if responses become less relevant or more repetitive.\n\nWhich monitoring approach is MOST appropriate?',
    options: [
      { letter: 'B', text: 'Set up periodic automated evaluation using Amazon Bedrock model evaluation against a curated test dataset. Create CloudWatch alarms on evaluation scores dropping below thresholds.' },
      { letter: 'A', text: 'Monitor CloudWatch metrics for Bedrock API latency and error rates.' },
      { letter: 'C', text: 'Use Amazon Bedrock Guardrails to block low-quality responses.' },
      { letter: 'D', text: 'Review model invocation logs manually each week.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Periodic automated evaluation with a curated test dataset detects quality degradation (relevance, coherence, repetitiveness) over time. CloudWatch alarms provide automated alerting when scores drop. <strong>A is wrong</strong> because latency and error rates measure operational health, not response quality. <strong>C is wrong</strong> because Guardrails filter specific content types but do not measure or track quality trends over time. <strong>D is wrong</strong> because manual weekly reviews are not scalable, not automated, and too infrequent to catch degradation quickly.'
  },
  {
    id: 63,
    domain: 'D4',
    domainName: 'Operational Efficiency',
    multi: false,
    text: 'A company processes thousands of documents daily using Amazon Bedrock. Many documents contain similar boilerplate text that results in identical prompts. The team wants to reduce costs by avoiding redundant model invocations.\n\nWhich approach is MOST cost-effective?',
    options: [
      { letter: 'C', text: 'Implement a caching layer using Amazon ElastiCache that stores prompt-response pairs. Check the cache before calling Bedrock and return cached responses for identical prompts.' },
      { letter: 'B', text: 'Use Amazon Bedrock batch inference to process all documents at once for a volume discount.' },
      { letter: 'A', text: 'Reduce the maxTokens parameter to generate shorter responses.' },
      { letter: 'D', text: 'Switch to a cheaper model for the boilerplate documents and use the premium model only for unique documents.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> Caching identical prompt-response pairs in ElastiCache eliminates redundant Bedrock invocations entirely. For documents with identical boilerplate, the cached response is returned instantly at near-zero cost. <strong>B is wrong</strong> because batch inference provides convenience but does not eliminate redundant processing for identical prompts. <strong>A is wrong</strong> because shorter responses reduce per-request cost but do not eliminate redundant invocations. <strong>D is wrong</strong> because using a cheaper model still incurs costs for every invocation — caching avoids the invocation entirely.'
  },
  {
    id: 64,
    domain: 'D4',
    domainName: 'Operational Efficiency',
    multi: false,
    text: 'A team is running Amazon Bedrock model evaluation to compare Claude Sonnet and Claude Haiku for a classification task. They want to evaluate accuracy, latency, and cost across 1,000 test cases.\n\nWhat is the correct way to run this comparison?',
    options: [
      { letter: 'D', text: 'Create a Bedrock model evaluation job with both models selected, provide the test dataset in JSONL format, and configure automatic evaluation with accuracy metrics.' },
      { letter: 'B', text: 'Run both models in production with A/B testing and collect metrics via CloudWatch.' },
      { letter: 'C', text: 'Write a custom Python script that calls both models for each test case and compares outputs manually.' },
      { letter: 'A', text: 'Use Amazon SageMaker Clarify to run bias and accuracy analysis on both models.' }
    ],
    correct: ['D'],
    explanation: '<strong>D is correct.</strong> Amazon Bedrock model evaluation natively supports comparing multiple models against a test dataset with automatic evaluation metrics. It handles the test execution, metric calculation, and reporting in a managed way. <strong>B is wrong</strong> because A/B testing in production is appropriate after evaluation, not as the evaluation method itself — it exposes users to unvalidated models. <strong>C is wrong</strong> because custom scripts replicate functionality already provided by the managed evaluation service and require more effort. <strong>A is wrong</strong> because SageMaker Clarify is designed for SageMaker models, not Bedrock foundation models.'
  },
  {
    id: 65,
    domain: 'D4',
    domainName: 'Operational Efficiency',
    multi: false,
    text: 'A company has 100,000 product descriptions that need to be translated into 5 languages using Amazon Bedrock. The translations are not time-sensitive and can be completed within 24 hours.\n\nWhich approach is MOST cost-effective?',
    options: [
      { letter: 'D', text: 'Use Amazon Bedrock batch inference to process all translations as an asynchronous batch job.' },
      { letter: 'B', text: 'Use the InvokeModel API with a Lambda function processing documents in parallel via SQS.' },
      { letter: 'C', text: 'Use Provisioned Throughput to guarantee capacity and process all translations as fast as possible.' },
      { letter: 'A', text: 'Use Amazon Translate instead of Bedrock for pure translation tasks.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Amazon Translate is a purpose-built, cost-effective translation service. For straightforward translation tasks (not creative adaptation), Translate is significantly cheaper than using a foundation model through Bedrock and supports batch translation natively. <strong>D is wrong</strong> because while Bedrock batch inference works, using a full foundation model for simple translation is more expensive than the dedicated Translate service. <strong>B is wrong</strong> because on-demand InvokeModel for 500,000 translations (100K × 5 languages) would be very expensive and complex to orchestrate. <strong>C is wrong</strong> because Provisioned Throughput optimizes for latency and consistency, not cost — and the task is not time-sensitive.'
  },
  {
    id: 66,
    domain: 'D4',
    domainName: 'Operational Efficiency',
    multi: false,
    text: 'A machine learning team manages multiple Amazon Bedrock fine-tuned models. They want to track which base model, training dataset, hyperparameters, and evaluation metrics were used for each fine-tuned model version.\n\nWhich approach provides the BEST model lifecycle management?',
    options: [
      { letter: 'B', text: 'Use Amazon Bedrock\'s built-in model customization job metadata which records the base model, training data S3 path, and hyperparameters for each job.' },
      { letter: 'A', text: 'Maintain a spreadsheet listing all model versions and their configurations.' },
      { letter: 'C', text: 'Store model metadata in S3 alongside the training data.' },
      { letter: 'D', text: 'Use Git tags to version the fine-tuning configuration files.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> Amazon Bedrock model customization jobs automatically record metadata including the base model, training data location, hyperparameters, and output model ARN. This provides built-in lifecycle tracking for each fine-tuning job. <strong>A is wrong</strong> because spreadsheets are manual, error-prone, and not integrated with the Bedrock workflow. <strong>C is wrong</strong> because storing metadata in S3 requires custom tooling to query and does not integrate with Bedrock\'s model management. <strong>D is wrong</strong> because Git tracks configuration file changes but not the actual training job execution metadata and results.'
  },
  {
    id: 67,
    domain: 'D4',
    domainName: 'Operational Efficiency',
    multi: false,
    text: 'A company notices that their Amazon Bedrock application costs have increased by 300% over the past month. They need to identify which application or team is driving the cost increase.\n\nWhat is the quickest way to identify the cost driver?',
    options: [
      { letter: 'C', text: 'Use AWS Cost Explorer with filters for the Bedrock service and group by tags (application, team) to identify which tagged resources have the highest cost.' },
      { letter: 'B', text: 'Review Amazon Bedrock model invocation logs to count API calls per application.' },
      { letter: 'A', text: 'Check AWS Budgets to see which budget was exceeded.' },
      { letter: 'D', text: 'Contact AWS Support to request a cost breakdown by application.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> AWS Cost Explorer provides detailed cost analysis with filtering and grouping capabilities. Grouping by cost allocation tags (team, application) quickly reveals which workload is driving the cost increase. <strong>B is wrong</strong> because invocation logs show call counts but not cost per call — different models have different pricing, and you would need to calculate costs manually. <strong>A is wrong</strong> because Budgets alerts when thresholds are exceeded but does not provide detailed breakdowns by application or team. <strong>D is wrong</strong> because contacting Support is slow compared to the self-service Cost Explorer tool.'
  },

  // ─── Domain 5: Testing & Troubleshooting (8 questions, IDs 68–75) ───
  {
    id: 68,
    domain: 'D5',
    domainName: 'Testing & Troubleshooting',
    multi: false,
    text: 'A team deployed an Amazon Bedrock RAG application. During testing, the application returns correct answers for simple factual questions but fails on complex multi-hop questions that require synthesizing information from multiple documents.\n\nWhat should the team investigate FIRST?',
    options: [
      { letter: 'D', text: 'Check whether the retrieval step returns sufficient relevant chunks by examining the retrieved passages. Increase the number of retrieved chunks and test with hybrid search.' },
      { letter: 'B', text: 'Switch to a larger, more capable foundation model for the generation step.' },
      { letter: 'C', text: 'Increase the chunk size to ensure each chunk contains more context.' },
      { letter: 'A', text: 'Lower the temperature to make the model more focused and deterministic.' }
    ],
    correct: ['D'],
    explanation: '<strong>D is correct.</strong> For multi-hop questions, the retrieval step must return all relevant chunks across multiple documents. Examining the retrieved passages reveals whether the issue is in retrieval (missing relevant chunks) or generation (model cannot synthesize). Increasing retrieval count and using hybrid search improves coverage. <strong>B is wrong</strong> because the model handles simple questions correctly — the issue is more likely in retrieval, not model capability. <strong>C is wrong</strong> because larger chunks don\'t help if the relevant chunks aren\'t being retrieved in the first place. <strong>D is wrong</strong> because temperature does not affect the model\'s ability to synthesize information from multiple sources.'
  },
  {
    id: 69,
    domain: 'D5',
    domainName: 'Testing & Troubleshooting',
    multi: false,
    text: 'An Amazon Bedrock application is returning a ThrottlingException error during peak hours. The team is using on-demand pricing.\n\nWhat are the immediate and long-term solutions?',
    options: [
      { letter: 'A', text: 'Immediate: implement exponential backoff and retry logic. Long-term: purchase Provisioned Throughput to guarantee capacity.' },
      { letter: 'B', text: 'Immediate: increase the maxTokens parameter. Long-term: switch to a different model.' },
      { letter: 'C', text: 'Immediate: contact AWS Support to increase the service limit. Long-term: deploy the model on SageMaker.' },
      { letter: 'D', text: 'Immediate: reduce the number of concurrent requests. Long-term: implement request queuing with SQS.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> ThrottlingException indicates the request rate exceeds the on-demand limit. Exponential backoff with retries handles transient throttling immediately. Provisioned Throughput provides dedicated capacity that is not subject to shared on-demand limits. <strong>B is wrong</strong> because maxTokens controls response length, not request rate, and switching models does not solve capacity issues. <strong>C is wrong</strong> because while service limit increases can help, Provisioned Throughput is the standard solution for guaranteed capacity. <strong>D is wrong</strong> because while reducing concurrency and queuing reduces pressure, it also reduces throughput — Provisioned Throughput maintains both high throughput and consistent performance.'
  },
  {
    id: 70,
    domain: 'D5',
    domainName: 'Testing & Troubleshooting',
    multi: false,
    text: 'A team fine-tuned an Amazon Bedrock model for sentiment analysis. The model achieves 95% accuracy on the test dataset but only 60% accuracy on real production data.\n\nWhat is the MOST likely cause?',
    options: [
      { letter: 'B', text: 'The training and test datasets are not representative of production data distribution. The model is overfitting to the training data characteristics.' },
      { letter: 'A', text: 'The production data volume is too high, causing the model to make errors under load.' },
      { letter: 'C', text: 'The model\'s context window is too small for production inputs.' },
      { letter: 'D', text: 'The production environment is using a different AWS Region than where the model was fine-tuned.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> A large gap between test accuracy and production accuracy is a classic sign of data distribution mismatch or overfitting. The test dataset likely does not represent the diversity, noise, or characteristics of real production data. The solution is to collect more representative training data and evaluate against production-like samples. <strong>A is wrong</strong> because model accuracy is independent of request volume — high load causes throttling, not accuracy degradation. <strong>C is wrong</strong> because context window issues would cause errors or truncation, not accuracy degradation. <strong>D is wrong</strong> because the AWS Region does not affect model accuracy — the same fine-tuned model produces identical outputs regardless of Region.'
  },
  {
    id: 71,
    domain: 'D5',
    domainName: 'Testing & Troubleshooting',
    multi: false,
    text: 'A developer is testing an Amazon Bedrock Agent. The agent correctly identifies that it needs to call an action group but always selects the wrong action from the available options.\n\nWhat should the developer check FIRST?',
    options: [
      { letter: 'C', text: 'Review the OpenAPI schema descriptions for each action. Ensure the operation descriptions clearly differentiate when each action should be used.' },
      { letter: 'B', text: 'Switch to a more capable foundation model for the agent.' },
      { letter: 'A', text: 'Add more action groups to give the agent more options to choose from.' },
      { letter: 'D', text: 'Increase the agent\'s temperature parameter to encourage exploration of different actions.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> The agent uses OpenAPI schema descriptions to determine which action to invoke. If descriptions are ambiguous, overlapping, or unclear, the agent may select the wrong action. Improving descriptions is the first and most effective fix. <strong>B is wrong</strong> because the agent recognizes it needs to call an action (reasoning works) — the issue is action selection, which depends on descriptions, not model capability. <strong>A is wrong</strong> because adding more actions increases complexity and makes the selection problem worse. <strong>D is wrong</strong> because higher temperature increases randomness, which would make action selection even less reliable.'
  },
  {
    id: 72,
    domain: 'D5',
    domainName: 'Testing & Troubleshooting',
    multi: false,
    text: 'After enabling Amazon Bedrock Guardrails on a production chatbot, users report that many legitimate queries are being blocked. The Guardrail is configured with content filters and denied topics.\n\nHow should the team troubleshoot this?',
    options: [
      { letter: 'D', text: 'Review the Guardrail trace logs to see which specific filter or topic is triggering the blocks, then adjust the filter strength or refine the denied topic definitions.' },
      { letter: 'B', text: 'Disable the Guardrail entirely and rely on the system prompt for content filtering.' },
      { letter: 'C', text: 'Increase the model\'s temperature to generate more varied responses that bypass the filters.' },
      { letter: 'A', text: 'Switch to a different foundation model that is less likely to trigger Guardrail filters.' }
    ],
    correct: ['D'],
    explanation: '<strong>D is correct.</strong> Bedrock Guardrails provide trace information showing which specific policy (content filter, denied topic, word filter) triggered a block. Reviewing traces identifies overly broad filters that can be tuned — for example, reducing filter strength from HIGH to MEDIUM or refining denied topic descriptions. <strong>B is wrong</strong> because disabling Guardrails entirely removes all safety protections and system prompts are not reliable alternatives. <strong>C is wrong</strong> because temperature does not affect Guardrail filter evaluation — Guardrails operate independently of model generation parameters. <strong>A is wrong</strong> because Guardrails filter content based on their configuration, not the model — the same Guardrail behavior would occur with any model.'
  },
  {
    id: 73,
    domain: 'D5',
    domainName: 'Testing & Troubleshooting',
    multi: false,
    text: 'A team deployed a Bedrock Knowledge Base. Users report that the chatbot gives outdated answers even though the source documents in S3 were updated 2 days ago.\n\nWhat is the MOST likely issue?',
    options: [
      { letter: 'A', text: 'The Knowledge Base data source has not been re-synced since the documents were updated. The team needs to start a new ingestion job to update the vector store.' },
      { letter: 'B', text: 'The model is using cached responses from before the document update.' },
      { letter: 'C', text: 'The updated documents are in a different S3 prefix than the data source configuration.' },
      { letter: 'D', text: 'The embedding model needs to be retrained on the new documents.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct.</strong> Amazon Bedrock Knowledge Bases do not automatically detect S3 changes. When documents are updated, a new ingestion job (sync) must be triggered to re-chunk, re-embed, and update the vector store. Until this happens, the Knowledge Base returns results based on the old document embeddings. <strong>B is wrong</strong> because Bedrock does not cache responses — each query performs fresh retrieval and generation. <strong>C is wrong</strong> because the question states the same documents were updated, not that new documents were added to a different location. <strong>D is wrong</strong> because the embedding model (e.g., Titan Embeddings) is pre-trained and does not need retraining — the documents just need to be re-ingested.'
  },
  {
    id: 74,
    domain: 'D5',
    domainName: 'Testing & Troubleshooting',
    multi: false,
    text: 'A Bedrock application suddenly starts returning ValidationException errors for all requests. The same requests worked correctly yesterday. No code changes were deployed.\n\nWhat should the developer check FIRST?',
    options: [
      { letter: 'B', text: 'Check if the model ID being used has been deprecated or if the model\'s input format requirements have changed in a recent Bedrock service update.' },
      { letter: 'A', text: 'Check the application\'s AWS credentials and IAM permissions to ensure they haven\'t expired or been modified.' },
      { letter: 'C', text: 'Check the VPC security group rules to ensure traffic to Bedrock is allowed.' },
      { letter: 'D', text: 'Check if the AWS Region is experiencing an outage on the AWS Health Dashboard.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct.</strong> ValidationException indicates the request format is invalid. If no code was changed, the most likely cause is a service-side change such as a model deprecation, version update, or input format change. Checking model availability and API documentation for recent changes is the first step. <strong>A is wrong</strong> because expired credentials or permission issues would cause AccessDeniedException or UnauthorizedException, not ValidationException. <strong>C is wrong</strong> because network issues would cause connection timeouts, not validation errors. <strong>D is wrong</strong> because a regional outage would cause service unavailable errors, not validation errors.'
  },
  {
    id: 75,
    domain: 'D5',
    domainName: 'Testing & Troubleshooting',
    multi: false,
    text: 'A team is load testing their Amazon Bedrock application before a product launch. They need to determine the maximum number of concurrent requests the application can handle while maintaining response times under 5 seconds.\n\nWhich testing approach is MOST appropriate?',
    options: [
      { letter: 'C', text: 'Gradually increase the number of concurrent requests while monitoring Bedrock API latency, error rates, and throttling metrics in CloudWatch. Identify the point where latency exceeds 5 seconds or throttling begins.' },
      { letter: 'B', text: 'Send the maximum expected number of concurrent requests all at once and check if any fail.' },
      { letter: 'A', text: 'Test with a single request and multiply the response time by the expected concurrent users.' },
      { letter: 'D', text: 'Use the Bedrock pricing calculator to determine the maximum throughput based on the selected model.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct.</strong> Gradual load ramp-up is the standard approach for capacity testing. Monitoring CloudWatch metrics (latency, throttling, errors) at each level identifies the inflection point where performance degrades. This approach accounts for shared on-demand capacity, connection overhead, and application-level bottlenecks. <strong>B is wrong</strong> because a sudden burst test does not identify the gradual degradation curve and may trigger aggressive throttling that masks the true capacity. <strong>A is wrong</strong> because latency does not scale linearly with concurrency — shared resources, queueing, and throttling create non-linear behavior. <strong>D is wrong</strong> because the pricing calculator estimates cost, not performance characteristics under load.'
  },
]
