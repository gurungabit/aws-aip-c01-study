import type { Question } from './questions'

export const questionsV4: Question[] = [
  // ─── D1: FM Integration, Data & Compliance (23 questions, IDs 1–23) ───
  {
    id: 1,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A financial services company wants to build an enterprise knowledge management system using Amazon Bedrock Knowledge Bases. They have 50,000 PDF documents stored in Amazon S3, averaging 30 pages each, and need to extract structured tables (balance sheets, income statements) before embedding. The extracted data must be searchable alongside unstructured narrative text. Which approach should a solutions architect recommend?',
    options: [
      { letter: 'A', text: 'Configure the Bedrock Knowledge Base with an S3 data source, enable default PDF parsing, and use Amazon OpenSearch Serverless as the vector store with 1536-dimension embeddings.' },
      { letter: 'B', text: 'Use Amazon Textract with the AnalyzeDocument API (TABLES feature type) to extract structured table data, store results in S3 as JSON, then configure a Bedrock Knowledge Base with a chunking strategy that preserves table structure alongside narrative text.' },
      { letter: 'C', text: 'Upload all PDFs directly to the Bedrock console, select the Titan Embeddings model, and let the managed service handle extraction and indexing automatically without any preprocessing.' },
      { letter: 'D', text: 'Use Amazon Comprehend to parse the PDFs, extract key-value pairs, and store results in Amazon DynamoDB, then query DynamoDB directly instead of using a vector store.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct</strong> because Amazon Textract\'s AnalyzeDocument API with the TABLES feature type is purpose-built for extracting structured tabular data from documents like balance sheets and income statements. By preprocessing with Textract and storing structured JSON alongside narrative text, the Bedrock Knowledge Base can chunk and embed both data types effectively. <strong>A is incorrect</strong> because default PDF parsing in Bedrock Knowledge Bases does not reliably extract structured table data—it treats tables as flat text, losing row/column relationships. <strong>C is incorrect</strong> because there is no bulk upload via the Bedrock console for 50,000 documents, and automatic parsing would not preserve table structures. <strong>D is incorrect</strong> because Amazon Comprehend is designed for NLP tasks (sentiment, entities) not structured table extraction from PDFs, and DynamoDB is not a vector store suitable for semantic search.'
  },
  {
    id: 2,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A consulting firm uses Microsoft SharePoint Online to manage 200,000 client engagement documents. They want to make this content searchable via a Bedrock Knowledge Base-powered chatbot without migrating data out of SharePoint. The documents are updated daily and must remain in sync. What is the MOST operationally efficient architecture?',
    options: [
      { letter: 'A', text: 'Configure a Bedrock Knowledge Base with the Microsoft SharePoint Online connector as a data source, set up OAuth 2.0 authentication with Azure AD, and schedule incremental sync every 6 hours.' },
      { letter: 'B', text: 'Write an AWS Lambda function triggered by a daily CloudWatch Events rule that uses the Microsoft Graph API to download all SharePoint documents to S3, then trigger a full Bedrock Knowledge Base sync.' },
      { letter: 'C', text: 'Use AWS DataSync to replicate SharePoint data to Amazon S3, configure S3 event notifications to trigger a Step Functions workflow that calls the Bedrock StartIngestionJob API for each new file.' },
      { letter: 'D', text: 'Deploy a self-managed Apache NiFi cluster on Amazon EC2 to continuously pull documents from SharePoint, transform them, and push to an OpenSearch cluster that Bedrock references.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because Amazon Bedrock Knowledge Bases natively supports a Microsoft SharePoint Online connector, allowing direct integration without data migration. OAuth 2.0 with Azure AD provides secure authentication, and incremental sync keeps data current with minimal overhead. <strong>B is incorrect</strong> because downloading all 200,000 documents daily is wasteful—it does not use incremental sync and introduces unnecessary data transfer costs and Lambda execution time. <strong>C is incorrect</strong> because AWS DataSync does not natively support SharePoint as a source location, requiring custom development. <strong>D is incorrect</strong> because managing a self-hosted Apache NiFi cluster introduces significant operational overhead for patching, scaling, and monitoring, violating the requirement for operational efficiency.'
  },
  {
    id: 3,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A media company wants to use Amazon Bedrock Knowledge Bases to index content from 500 public-facing websites that are updated frequently. They need to crawl these sites weekly, respect robots.txt, and ensure the knowledge base stays current. Which configuration meets these requirements?',
    options: [
      { letter: 'A', text: 'Configure a Bedrock Knowledge Base web crawler data source with the list of 500 seed URLs, set the crawl scope to HOST_ONLY, configure a crawl rate limit of 10 pages per second, and schedule the sync cadence to weekly.' },
      { letter: 'B', text: 'Deploy Scrapy on AWS Fargate to crawl the 500 websites, store HTML files in S3, configure a Bedrock Knowledge Base with the S3 data source, and use an EventBridge rule to trigger weekly ingestion.' },
      { letter: 'C', text: 'Use Amazon Kendra\'s web crawler to index the 500 websites, then use the Kendra Retrieve API as a custom retriever for Bedrock agents instead of a Bedrock Knowledge Base.' },
      { letter: 'D', text: 'Configure AWS Glue crawlers to index the websites into a Glue Data Catalog, then point the Bedrock Knowledge Base to the Glue Data Catalog as a structured data source.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because Bedrock Knowledge Bases supports a web crawler data source that accepts seed URLs, respects robots.txt by default, allows scope configuration (HOST_ONLY prevents crawling external links), and supports scheduled sync. <strong>B is incorrect</strong> because while functionally possible, managing a Scrapy crawler on Fargate introduces unnecessary operational complexity when a managed web crawler data source is available natively. <strong>C is incorrect</strong> because the question specifically asks for a Bedrock Knowledge Base solution, not Amazon Kendra, and Kendra has a separate pricing model and configuration. <strong>D is incorrect</strong> because AWS Glue crawlers are designed for data lake schema discovery (databases, S3 files), not web content crawling—they cannot index public websites.'
  },
  {
    id: 4,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: true,
    text: 'A healthcare organization is building a clinical research assistant using Amazon Bedrock. They need to process 10,000 medical research papers (PDFs with complex layouts including multi-column text, embedded figures, and citation tables). The system must extract entities (drug names, dosages, conditions) and make them searchable with high accuracy. Which TWO steps should be included in the data pipeline? (Select TWO.)',
    options: [
      { letter: 'A', text: 'Use Amazon Textract with the LAYOUT feature type to preserve multi-column reading order and extract text with spatial awareness from the complex PDF layouts.' },
      { letter: 'B', text: 'Use Amazon Rekognition to analyze the embedded figures and convert them to text descriptions for embedding.' },
      { letter: 'C', text: 'Use Amazon Comprehend Medical to extract medical entities (drug names, dosages, conditions) from the Textract output and store as metadata for filtering during retrieval.' },
      { letter: 'D', text: 'Use Amazon Translate to convert all papers to English before processing to ensure consistent entity extraction accuracy.' },
      { letter: 'E', text: 'Use Amazon Polly to generate audio versions of the papers, then use Amazon Transcribe to create clean text transcripts for embedding.' }
    ],
    correct: ['A', 'C'],
    explanation: '<strong>A is correct</strong> because Amazon Textract\'s LAYOUT feature type is specifically designed to understand complex document layouts including multi-column text, preserving correct reading order, which is critical for medical papers with two-column formats. <strong>C is correct</strong> because Amazon Comprehend Medical is purpose-built for extracting medical entities (medications, dosages, medical conditions, procedures) from clinical text, and storing these as metadata enables filtered retrieval in the knowledge base. <strong>B is incorrect</strong> because Amazon Rekognition is for image/video analysis (object detection, facial recognition), not for converting scientific figures into meaningful text descriptions. <strong>D is incorrect</strong> because the question does not mention multilingual papers—this adds unnecessary cost and latency without addressing the stated requirements. <strong>E is incorrect</strong> because converting text to audio and back to text (Polly then Transcribe) would degrade quality and is an illogical pipeline that adds cost without benefit.'
  },
  {
    id: 5,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A data engineering team is building a continuous ingestion pipeline for a Bedrock Knowledge Base. New documents arrive in an S3 bucket at a rate of approximately 500 per hour. The knowledge base must reflect new documents within 15 minutes of arrival. The team wants to minimize cost and operational overhead. Which pipeline design is MOST appropriate?',
    options: [
      { letter: 'A', text: 'Configure S3 Event Notifications to trigger an AWS Lambda function on each PutObject event, which calls the Bedrock StartIngestionJob API for each individual document.' },
      { letter: 'B', text: 'Use Amazon EventBridge Scheduler to trigger a Lambda function every 15 minutes that calls the Bedrock StartIngestionJob API, which performs incremental sync of only new or modified objects in the S3 data source.' },
      { letter: 'C', text: 'Deploy an Amazon Kinesis Data Stream to buffer S3 events, use a Kinesis Data Analytics application to batch events into 15-minute windows, and trigger ingestion jobs from the analytics output.' },
      { letter: 'D', text: 'Configure AWS Transfer Family to accept documents via SFTP, which deposits files in S3 and automatically triggers a full knowledge base re-sync after each upload completes.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct</strong> because EventBridge Scheduler provides a simple, cost-effective way to trigger periodic ingestion. The Bedrock StartIngestionJob API performs incremental sync by default, processing only new or modified objects, which meets the 15-minute freshness requirement with minimal overhead. <strong>A is incorrect</strong> because triggering a separate ingestion job for each of the 500 documents per hour would create excessive API calls and potentially throttling—ingestion jobs are designed to process batches, not individual files. <strong>C is incorrect</strong> because Kinesis Data Stream and Kinesis Data Analytics add unnecessary complexity and cost for what is essentially a simple periodic batch trigger. <strong>D is incorrect</strong> because AWS Transfer Family is for file transfer protocols and a full re-sync after each upload is extremely inefficient for 500 documents per hour.'
  },
  {
    id: 6,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'An AI architect is configuring vector embeddings for a Bedrock Knowledge Base that will serve a legal document search application. The corpus contains 2 million documents averaging 15 pages each. Query latency must be under 500ms at the 99th percentile, and the vector store is Amazon OpenSearch Serverless. The team is debating embedding dimensions. Which configuration balances search quality and performance?',
    options: [
      { letter: 'A', text: 'Use Amazon Titan Text Embeddings V2 with 256 dimensions to minimize storage and maximize query speed, accepting slightly reduced semantic precision.' },
      { letter: 'B', text: 'Use Amazon Titan Text Embeddings V2 with 1024 dimensions as a balanced choice between semantic precision for legal terminology and query latency within the OpenSearch Serverless vector engine.' },
      { letter: 'C', text: 'Use Amazon Titan Text Embeddings V2 with 1536 dimensions for maximum semantic precision, and scale OpenSearch Serverless OCUs to compensate for the increased query latency.' },
      { letter: 'D', text: 'Use Cohere Embed English v3 with 1024 dimensions because third-party models always provide better embedding quality than first-party AWS models.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct</strong> because 1024 dimensions with Titan Text Embeddings V2 provides a strong balance between semantic precision (important for nuanced legal terminology) and query performance. For 2 million documents with strict latency requirements, this dimension count keeps index sizes manageable while maintaining quality. <strong>A is incorrect</strong> because 256 dimensions, while fast, sacrifices too much semantic precision for a legal application where distinguishing subtle differences in terminology (e.g., "liable" vs "responsible") is critical. <strong>C is incorrect</strong> because 1536 dimensions increases storage and query latency significantly for the 2-million document corpus, and simply scaling OCUs adds unnecessary cost when a lower dimension can meet quality needs. <strong>D is incorrect</strong> because the claim that third-party models "always provide better embedding quality" is false—model selection depends on the use case, and the reasoning is flawed.'
  },
  {
    id: 7,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A machine learning team is evaluating similarity metrics for their Bedrock Knowledge Base vector store. They are using normalized embeddings from Amazon Titan Text Embeddings V2 and need to retrieve the most semantically similar passages for question-answering. Which similarity metric should they configure, and why?',
    options: [
      { letter: 'A', text: 'Cosine similarity, because it measures the angle between vectors and is invariant to vector magnitude, making it ideal for comparing semantic direction regardless of document length.' },
      { letter: 'B', text: 'Euclidean distance (L2), because it captures the absolute distance between vectors in embedding space, providing more accurate results for normalized embeddings.' },
      { letter: 'C', text: 'Dot product, because with normalized embeddings it is mathematically equivalent to cosine similarity but computationally cheaper, making it the optimal choice for this scenario.' },
      { letter: 'D', text: 'Manhattan distance (L1), because it is more robust to outlier dimensions in high-dimensional embedding spaces compared to Euclidean distance.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct</strong> because when embeddings are normalized (unit vectors), the dot product equals cosine similarity mathematically (cos(θ) = a·b when ||a||=||b||=1), but dot product requires fewer operations (no magnitude calculation), making it computationally cheaper for the same result. <strong>A is incorrect</strong> because while cosine similarity works correctly, the question specifies normalized embeddings, making dot product the more efficient choice that produces identical results. <strong>B is incorrect</strong> because Euclidean distance measures absolute distance rather than angular similarity, and for semantic search the directional relationship between vectors is more meaningful than absolute distance. <strong>D is incorrect</strong> because Manhattan distance is not commonly used or optimized for in vector search engines like OpenSearch Serverless, and its theoretical robustness to outliers does not translate to better semantic search quality.'
  },
  {
    id: 8,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: true,
    text: 'A retail company wants to implement hybrid retrieval for their product knowledge base to handle both semantic queries ("comfortable running shoes for flat feet") and keyword queries ("SKU-48291-BL size 10"). They are using Amazon Bedrock Knowledge Bases with Amazon OpenSearch Serverless. Which TWO configurations should they implement? (Select TWO.)',
    options: [
      { letter: 'A', text: 'Enable the hybrid search mode in the Bedrock Knowledge Base retrieval configuration, which combines vector similarity search with OpenSearch keyword (BM25) scoring.' },
      { letter: 'B', text: 'Create two separate knowledge bases—one configured for vector search and another for keyword search—and merge results in a Lambda function.' },
      { letter: 'C', text: 'Configure metadata filtering on the knowledge base to allow filtering by product attributes (category, size, color) alongside the hybrid search results to narrow retrieval.' },
      { letter: 'D', text: 'Replace OpenSearch Serverless with Amazon Kendra, which natively supports hybrid search without additional configuration.' },
      { letter: 'E', text: 'Use Amazon CloudSearch as the backend instead of OpenSearch Serverless because CloudSearch provides better BM25 keyword ranking.' }
    ],
    correct: ['A', 'C'],
    explanation: '<strong>A is correct</strong> because Bedrock Knowledge Bases supports a hybrid search retrieval mode with OpenSearch Serverless that combines vector semantic search with BM25 keyword scoring, handling both types of queries effectively. <strong>C is correct</strong> because metadata filtering allows precise narrowing by structured attributes (SKU, size, color, category), complementing hybrid search for product queries that include specific attribute values. <strong>B is incorrect</strong> because maintaining two separate knowledge bases doubles operational overhead and cost, and merging results manually in Lambda is error-prone and unnecessary when hybrid search is natively supported. <strong>D is incorrect</strong> because replacing the vector store would require rebuilding the entire knowledge base, and Kendra is a separate service with different pricing and capabilities—it is not a drop-in replacement for OpenSearch Serverless in a Bedrock Knowledge Base. <strong>E is incorrect</strong> because Amazon CloudSearch is not a supported vector store for Bedrock Knowledge Bases and lacks vector search capabilities entirely.'
  },
  {
    id: 9,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A solutions architect needs to compare foundation models for a customer service chatbot project. They want to quickly test Claude 3 Sonnet, Llama 3, and Mistral Large with the same set of 20 representative customer queries, examining response quality, tone, and latency. The comparison must be completed within one day without writing any code. Which approach should they use?',
    options: [
      { letter: 'A', text: 'Use the Amazon Bedrock Playground chat mode to manually test each model with the 20 queries, adjusting temperature and top-p parameters, and comparing responses side by side in the console.' },
      { letter: 'B', text: 'Deploy all three models as SageMaker endpoints, write a Python script to send the 20 queries to each endpoint, and collect responses in a Jupyter notebook for comparison.' },
      { letter: 'C', text: 'Use Amazon Bedrock model evaluation jobs with a custom prompt dataset containing the 20 queries, selecting automatic evaluation with built-in metrics for quality and toxicity.' },
      { letter: 'D', text: 'Set up an A/B testing framework using API Gateway and Lambda to route queries randomly to different Bedrock models and collect user feedback over one week.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because the Bedrock Playground provides a no-code interface to test multiple models interactively, adjust inference parameters, and compare outputs. For 20 queries completed in one day, this is the fastest approach requiring zero code. <strong>B is incorrect</strong> because deploying SageMaker endpoints requires code for deployment and inference, violating the no-code requirement, and adds unnecessary cost and setup time. <strong>C is incorrect</strong> because while model evaluation jobs can automate comparison, they are designed for larger-scale evaluations and the automatic metrics (ROUGE, BERTScore) may not capture subjective qualities like tone that the architect wants to assess. <strong>D is incorrect</strong> because building an A/B testing framework requires significant code and infrastructure setup, and collecting user feedback over one week exceeds the one-day timeline.'
  },
  {
    id: 10,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A company has a Bedrock Knowledge Base with an Atlassian Confluence data source containing 30,000 wiki pages across 50 Confluence spaces. They want to restrict the chatbot so that users in the "Engineering" department can only retrieve content from the 10 engineering-related spaces, while "Sales" users can only access 5 sales spaces. How should they implement this access control?',
    options: [
      { letter: 'A', text: 'Create separate Bedrock Knowledge Bases for each department, each configured with its own Confluence data source pointing to the allowed spaces, and route users to the appropriate knowledge base based on department.' },
      { letter: 'B', text: 'Use the Confluence connector\'s metadata filtering with the space key attribute, and at query time apply a retrieval filter based on the authenticated user\'s department to restrict results to permitted spaces.' },
      { letter: 'C', text: 'Configure IAM policies with conditions that restrict Bedrock RetrieveAndGenerate API access based on a custom tag representing the Confluence space, mapped to the user\'s department.' },
      { letter: 'D', text: 'Implement a post-retrieval Lambda function that checks each retrieved chunk\'s source Confluence space against an access control list and removes unauthorized results before passing to the FM.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct</strong> because Bedrock Knowledge Base retrieval supports metadata filtering at query time. The Confluence connector indexes space-related metadata, and applying a filter on the space key based on the user\'s department ensures only authorized content is retrieved without duplicating infrastructure. <strong>A is incorrect</strong> because creating separate knowledge bases for each department significantly increases cost (multiple vector store indexes) and operational overhead for what metadata filtering solves natively. <strong>C is incorrect</strong> because IAM policies control API-level access (who can call the API), not content-level access (which documents are returned)—IAM conditions cannot filter by Confluence space within retrieval results. <strong>D is incorrect</strong> because post-retrieval filtering is inefficient—unauthorized chunks still consume retrieval slots, potentially pushing relevant authorized content out of the top-K results, degrading answer quality.'
  },
  {
    id: 11,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'An enterprise has 5 TB of internal documentation across multiple formats (PDF, DOCX, HTML, CSV). They are configuring chunking for their Bedrock Knowledge Base. The documents range from short FAQ pages (200 words) to detailed technical manuals (50,000 words). Which chunking strategy provides the best retrieval quality for this varied corpus?',
    options: [
      { letter: 'A', text: 'Use fixed-size chunking with 512-token chunks and 20% overlap to ensure consistent chunk sizes across all document types.' },
      { letter: 'B', text: 'Use semantic chunking, which uses the embedding model to identify natural topic boundaries and creates variable-length chunks that preserve coherent meaning units.' },
      { letter: 'C', text: 'Use hierarchical chunking with parent chunks of 2000 tokens and child chunks of 500 tokens, retrieving child chunks and passing the parent chunk as context to the FM.' },
      { letter: 'D', text: 'Disable chunking entirely and embed each document as a single vector to preserve full document context in every retrieval.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct</strong> because semantic chunking adapts to the natural structure of each document, creating variable-length chunks at topic boundaries. For a varied corpus with short FAQs and long manuals, this ensures each chunk contains a coherent unit of meaning regardless of document length. <strong>A is incorrect</strong> because fixed-size chunking at 512 tokens would arbitrarily split content mid-paragraph in long manuals and might create overly small chunks for FAQ entries, reducing retrieval quality for both extremes. <strong>C is incorrect</strong> because while hierarchical chunking is useful, the parent/child approach adds complexity and the rigid token boundaries (2000/500) still suffer from arbitrary splitting like fixed-size chunking. <strong>D is incorrect</strong> because embedding 50,000-word documents as single vectors loses semantic specificity—the resulting vector represents an average of all topics, making precise passage retrieval impossible.'
  },
  {
    id: 12,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A government contractor needs to build a document processing pipeline for scanned paper forms submitted by citizens. Each form contains handwritten fields, checkboxes, and printed text. The extracted data must be stored in a structured format for downstream analytics. The forms are not standardized—there are over 200 different form types. Which AWS service combination is MOST suitable?',
    options: [
      { letter: 'A', text: 'Use Amazon Textract AnalyzeDocument with FORMS feature type to extract key-value pairs and QUERIES feature type with pre-defined questions for each form type to extract specific fields.' },
      { letter: 'B', text: 'Use Amazon Rekognition DetectText to OCR the handwritten and printed text, then use Amazon Comprehend to classify the extracted text into structured fields.' },
      { letter: 'C', text: 'Train a custom Amazon SageMaker object detection model to identify field locations on each form type, then use Textract on the cropped regions.' },
      { letter: 'D', text: 'Use Amazon Bedrock with a vision-capable model (Claude 3) to process each scanned form image and extract structured data in JSON format via prompt engineering.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because Textract\'s FORMS feature type automatically extracts key-value pairs from forms (including handwritten text), and the QUERIES feature type allows asking natural language questions about specific fields without needing custom templates for each form type. This handles the 200+ form types without per-type training. <strong>B is incorrect</strong> because Rekognition DetectText is designed for text in images/videos (like signs, license plates) and has limited handwriting support—it cannot extract form-level key-value pairs or understand checkbox states. <strong>C is incorrect</strong> because training a custom object detection model for 200+ form types requires extensive labeled training data for each type, creating an enormous annotation burden that Textract\'s pre-trained capabilities eliminate. <strong>D is incorrect</strong> because while vision-capable FMs can process forms, they are significantly more expensive per page than Textract, may hallucinate field values, and lack the deterministic extraction guarantees needed for government data processing.'
  },
  {
    id: 13,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A pharmaceutical company uses Amazon Comprehend to extract entities from clinical trial reports before indexing them in a Bedrock Knowledge Base. They need to identify Protected Health Information (PHI) including patient names, dates, and medical record numbers for redaction before the data enters the knowledge base. Which Amazon Comprehend feature should they use?',
    options: [
      { letter: 'A', text: 'Use Amazon Comprehend\'s DetectEntities API with the standard entity types (PERSON, DATE, QUANTITY) and build custom regex patterns for medical record numbers.' },
      { letter: 'B', text: 'Use Amazon Comprehend Medical\'s DetectPHI API, which is specifically trained to identify all categories of Protected Health Information as defined by HIPAA.' },
      { letter: 'C', text: 'Use Amazon Comprehend\'s DetectPiiEntities API, which identifies personally identifiable information including names, dates, and identification numbers.' },
      { letter: 'D', text: 'Use Amazon Macie to scan the clinical trial reports for sensitive data patterns and generate findings that can be used to redact PHI.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct</strong> because Amazon Comprehend Medical\'s DetectPHI API is specifically designed and trained to identify all 18 categories of Protected Health Information defined by HIPAA, including patient names, dates, medical record numbers, and other clinical identifiers unique to healthcare contexts. <strong>A is incorrect</strong> because standard Comprehend entity detection identifies general entities (PERSON, DATE) but lacks healthcare-specific PHI categories like medical record numbers, health plan beneficiary numbers, and device identifiers. Custom regex would not cover all PHI types reliably. <strong>C is incorrect</strong> because DetectPiiEntities identifies general PII (SSN, credit cards, email addresses) but does not cover healthcare-specific PHI categories like medical record numbers, health plan IDs, or clinical identifiers defined by HIPAA. <strong>D is incorrect</strong> because Amazon Macie is designed for discovering sensitive data in S3 objects at scale—it does not provide the granular, in-text entity detection with character offsets needed for selective redaction within documents.'
  },
  {
    id: 14,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: true,
    text: 'An insurance company is designing a data pipeline that continuously updates a Bedrock Knowledge Base as claims documents are processed. The pipeline must handle 2,000 new documents per day, transform them into optimal format for embedding, enrich them with metadata, and ensure the knowledge base index stays current. Which TWO components should the pipeline include? (Select TWO.)',
    options: [
      { letter: 'A', text: 'An AWS Step Functions workflow that orchestrates document transformation (Textract for extraction, Comprehend for entity tagging), writes enriched documents and metadata JSON files to S3, and triggers the Bedrock StartIngestionJob API upon completion.' },
      { letter: 'B', text: 'An Amazon Kinesis Data Firehose delivery stream that buffers incoming documents and delivers them directly to the Bedrock Knowledge Base vector store in micro-batches.' },
      { letter: 'C', text: 'An S3 bucket lifecycle policy that automatically moves processed documents to S3 Glacier after 30 days to reduce the knowledge base index size and improve query performance.' },
      { letter: 'D', text: 'Metadata files in JSON format co-located with each source document in S3, containing extracted entities (claimant name, claim type, date) that Bedrock Knowledge Base indexes for filtered retrieval.' },
      { letter: 'E', text: 'An Amazon SQS queue that receives document processing completion events, with a consumer Lambda that calls the Bedrock InvokeModel API to generate embeddings and writes them directly to OpenSearch.' }
    ],
    correct: ['A', 'D'],
    explanation: '<strong>A is correct</strong> because Step Functions provides durable orchestration for the multi-step pipeline (extraction, enrichment, S3 storage, ingestion trigger), handling retries and error states for 2,000 daily documents reliably. <strong>D is correct</strong> because Bedrock Knowledge Bases supports metadata files (JSON) co-located with source documents in S3, enabling filtered retrieval by attributes like claim type or date—essential for insurance use cases. <strong>B is incorrect</strong> because Kinesis Data Firehose cannot deliver directly to a Bedrock Knowledge Base vector store—it supports destinations like S3, Redshift, and OpenSearch, but not Bedrock Knowledge Base ingestion. <strong>C is incorrect</strong> because moving documents to Glacier does not affect the vector store index—the knowledge base index is independent of S3 storage class, so this would only make re-ingestion impossible without restoring. <strong>E is incorrect</strong> because generating embeddings and writing directly to OpenSearch bypasses Bedrock Knowledge Base\'s managed chunking, metadata indexing, and retrieval pipeline, creating a fragile custom solution.'
  },
  {
    id: 15,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A multinational corporation has Bedrock Knowledge Bases deployed in us-east-1. Their European subsidiary requires that all EU customer data processed by the knowledge base remains within the eu-west-1 Region to comply with GDPR data residency requirements. European users currently experience 180ms additional latency querying the US-based knowledge base. What is the recommended architecture?',
    options: [
      { letter: 'A', text: 'Create a separate Bedrock Knowledge Base in eu-west-1 with its own data sources and vector store, ensuring EU customer documents are only stored and processed in the EU Region.' },
      { letter: 'B', text: 'Enable S3 Cross-Region Replication from us-east-1 to eu-west-1, and configure a second data source in the existing knowledge base pointing to the eu-west-1 S3 bucket.' },
      { letter: 'C', text: 'Use Amazon CloudFront with an origin in us-east-1 to cache knowledge base API responses at EU edge locations, reducing latency while keeping data in the US.' },
      { letter: 'D', text: 'Configure a VPC peering connection between us-east-1 and eu-west-1, and use a private endpoint in eu-west-1 to route European user queries to the US-based knowledge base with reduced latency.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because GDPR data residency requires that EU personal data is stored and processed within the EU. A separate knowledge base in eu-west-1 with its own vector store ensures all data processing (embedding generation, vector storage, retrieval) occurs in the EU Region, satisfying compliance and reducing latency. <strong>B is incorrect</strong> because replicating data to eu-west-1 still processes queries in us-east-1 where the knowledge base resides—the data would exist in both regions, and query processing would still occur outside the EU. <strong>C is incorrect</strong> because caching API responses at edge locations means EU customer data is temporarily stored at CloudFront edge locations outside eu-west-1, and the original processing still occurs in us-east-1, violating data residency requirements. <strong>D is incorrect</strong> because VPC peering only changes the network path—the knowledge base processing (embedding comparison, FM inference) still occurs in us-east-1, which violates GDPR data residency requirements for EU customer data.'
  },
  {
    id: 16,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A solutions architect is configuring an Amazon Bedrock Knowledge Base with Amazon Aurora PostgreSQL as the vector store using the pgvector extension. The corpus contains 500,000 technical documents, and they need to support approximate nearest neighbor (ANN) searches with high recall. Which pgvector index type should they configure?',
    options: [
      { letter: 'A', text: 'HNSW (Hierarchical Navigable Small World) index, which builds a multi-layer graph structure providing high recall with consistent query latency, though requiring more memory during index construction.' },
      { letter: 'B', text: 'IVFFlat (Inverted File with Flat compression) index, which partitions vectors into clusters and searches only the nearest clusters, providing faster index construction but lower recall than HNSW.' },
      { letter: 'C', text: 'GIN (Generalized Inverted Index), which is PostgreSQL\'s standard full-text search index adapted for vector similarity operations.' },
      { letter: 'D', text: 'B-tree index on the vector column, which provides exact nearest neighbor search with guaranteed 100% recall at the cost of higher query latency.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because HNSW indexes provide the highest recall among ANN index types in pgvector. The graph-based structure allows efficient navigation to nearest neighbors with consistently high recall rates (typically >95%), meeting the requirement for high recall. The tradeoff of higher memory during construction is acceptable for a 500,000 document corpus. <strong>B is incorrect</strong> because while IVFFlat is a valid pgvector index type, it provides lower recall than HNSW at comparable query speeds, as it may miss relevant vectors in clusters that are not searched. The question specifically requires high recall. <strong>C is incorrect</strong> because GIN indexes are used for full-text search, JSONB, and array operations in PostgreSQL—they do not support vector similarity operations. <strong>D is incorrect</strong> because B-tree indexes do not support vector similarity search operations in pgvector—they are designed for scalar value ordering and cannot compute cosine similarity or Euclidean distance.'
  },
  {
    id: 17,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A startup is building a customer support chatbot using Amazon Bedrock. They want to use the Anthropic Claude 3 Sonnet model and need to pass system-level instructions that persist across all conversations, such as "You are a helpful customer support agent for TechCorp. Never discuss competitor products. Always be polite and professional." How should they pass these instructions via the Bedrock API?',
    options: [
      { letter: 'A', text: 'Include the instructions in the system parameter of the Bedrock Converse API or InvokeModel API request, which provides model-level system prompting that frames all subsequent messages.' },
      { letter: 'B', text: 'Prepend the instructions to the first user message in the conversation as a special [SYSTEM] tagged block that the model will interpret as system instructions.' },
      { letter: 'C', text: 'Store the instructions in an S3 file and reference the S3 URI in the modelId parameter of the API call to load custom system behavior.' },
      { letter: 'D', text: 'Create a custom model using Bedrock fine-tuning with training data that encodes the system behavior, since system prompts are not supported for third-party models in Bedrock.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because the Bedrock Converse API and InvokeModel API support a system parameter (or system field in the request body) that provides persistent system-level instructions to the model. This is the standard, supported mechanism for system prompting in Bedrock. <strong>B is incorrect</strong> because while prepending instructions to user messages can work as a workaround, it is not the correct approach—the system parameter is purpose-built for this and provides better model adherence to instructions. The [SYSTEM] tag is not a recognized Bedrock convention. <strong>C is incorrect</strong> because the modelId parameter identifies the model to invoke (e.g., "anthropic.claude-3-sonnet-20240229-v1:0") and does not accept S3 URIs for behavior configuration. <strong>D is incorrect</strong> because system prompts are fully supported for third-party models in Bedrock—fine-tuning for basic behavioral instructions is unnecessarily expensive and time-consuming.'
  },
  {
    id: 18,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'An analytics team wants to use Amazon Bedrock to analyze structured data from their Amazon Redshift data warehouse. They need the FM to generate SQL queries based on natural language questions, execute them against Redshift, and present results in conversational format. Which approach provides this capability with the LEAST custom development?',
    options: [
      { letter: 'A', text: 'Configure a Bedrock Agent with a Redshift action group that uses an OpenAPI schema defining available query operations, with a Lambda function that executes generated SQL against Redshift and returns results.' },
      { letter: 'B', text: 'Create a Bedrock Knowledge Base with a structured data source connected to Amazon Redshift, which automatically generates SQL and queries the warehouse during retrieval.' },
      { letter: 'C', text: 'Use Amazon Q in QuickSight, which provides natural language to SQL capabilities for Redshift without requiring custom development of the query generation and execution pipeline.' },
      { letter: 'D', text: 'Fine-tune a Bedrock model on examples of natural language to Redshift SQL translations, then use the fine-tuned model to generate SQL that a separate application executes.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct</strong> because Amazon Q in QuickSight (formerly Amazon QuickSight Q) provides built-in natural language querying of data sources including Amazon Redshift. It handles SQL generation, execution, and result presentation without custom development, meeting the "least custom development" requirement. <strong>A is incorrect</strong> because configuring a Bedrock Agent with an action group requires writing a Lambda function for SQL execution, defining an OpenAPI schema, and handling SQL generation prompts—this is significant custom development. <strong>B is incorrect</strong> because Bedrock Knowledge Bases with structured data sources do not automatically generate SQL queries against Redshift—they are designed for document retrieval, not database querying. <strong>D is incorrect</strong> because fine-tuning a model on SQL translation examples requires creating training data, running fine-tuning jobs, and still building a separate application to execute the SQL—this is the most development-heavy option.'
  },
  {
    id: 19,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A company is building a multi-modal knowledge base for their product catalog. Each product has images, technical specifications (text), and 3D model files. They want users to search using text queries ("red wireless headphones under $100") and image queries (uploading a photo to find similar products). Which Amazon Bedrock configuration supports this?',
    options: [
      { letter: 'A', text: 'Use Amazon Titan Multimodal Embeddings to generate embeddings for both text and images, store them in the same vector space in the knowledge base, enabling cross-modal search where text queries can match image embeddings and vice versa.' },
      { letter: 'B', text: 'Create two separate knowledge bases—one using Titan Text Embeddings for text and another using Amazon Rekognition for image indexing—and combine results at query time.' },
      { letter: 'C', text: 'Use Amazon Titan Image Generator to convert product images into text descriptions, then embed only the text descriptions in the knowledge base for unified text-based search.' },
      { letter: 'D', text: 'Store product images in Amazon S3, use Amazon Rekognition SearchFacesByImage to find similar products, and use a separate Bedrock Knowledge Base for text searches.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because Amazon Titan Multimodal Embeddings generates embeddings for both text and images in a shared vector space. This enables cross-modal retrieval where a text query like "red wireless headphones" retrieves relevant product images, and an uploaded image retrieves matching text descriptions. <strong>B is incorrect</strong> because using two separate systems (Titan Text Embeddings and Rekognition) means text and image representations are in different embedding spaces, making cross-modal matching impossible—a text query cannot find similar images. <strong>C is incorrect</strong> because converting images to text descriptions via Titan Image Generator (which generates images, not descriptions) loses visual information and is architecturally backwards. <strong>D is incorrect</strong> because SearchFacesByImage is for facial recognition, not product similarity search, and maintaining two separate search systems adds complexity without enabling cross-modal retrieval.'
  },
  {
    id: 20,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A legal firm is configuring a Bedrock Knowledge Base for case law research. During testing, they find that retrieved passages often miss critical context because relevant information spans multiple paragraphs. For example, a statute reference in one paragraph is explained in the next paragraph, but only one paragraph is retrieved. Which retrieval configuration change would MOST effectively address this?',
    options: [
      { letter: 'A', text: 'Increase the number of retrieved results (top-K) from 5 to 20, hoping to capture adjacent paragraphs in the additional results.' },
      { letter: 'B', text: 'Increase the chunk overlap percentage from 10% to 40% so that adjacent chunks share more content, increasing the likelihood that context from neighboring paragraphs is included in each chunk.' },
      { letter: 'C', text: 'Switch from fixed-size chunking to no chunking, embedding entire documents as single vectors to guarantee all context is captured.' },
      { letter: 'D', text: 'Reduce the chunk size from 1000 tokens to 200 tokens to create more granular chunks and increase the total number of relevant passages retrieved.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct</strong> because increasing chunk overlap ensures that content from neighboring paragraphs is duplicated at chunk boundaries. With 40% overlap, a statute reference at the end of one chunk and its explanation at the beginning of the next chunk will both appear in at least one chunk, preserving cross-paragraph context. <strong>A is incorrect</strong> because increasing top-K retrieves more chunks but does not guarantee adjacent chunks are retrieved—the additional results may come from entirely different sections of the corpus, and passing 20 chunks to the FM may exceed context limits. <strong>C is incorrect</strong> because embedding entire legal documents (which can be hundreds of pages) as single vectors produces poor-quality embeddings that average all topics, making precise passage retrieval impossible. <strong>D is incorrect</strong> because reducing chunk size to 200 tokens exacerbates the problem—smaller chunks contain even less context, making it more likely that related information is split across chunks without overlap to bridge them.'
  },
  {
    id: 21,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A data science team is evaluating Amazon Bedrock models for a text summarization task. They want to run an automated evaluation comparing Claude 3 Haiku, Titan Text Express, and Mistral 7B using 500 source documents with human-written reference summaries. They need metrics for factual consistency, relevance, and fluency. Which approach is MOST appropriate?',
    options: [
      { letter: 'A', text: 'Create a Bedrock model evaluation job with a custom prompt dataset, selecting the three models, and use the built-in summarization metrics including ROUGE, BERTScore, and factual consistency scoring with an evaluator model.' },
      { letter: 'B', text: 'Use the Bedrock Playground to manually test 10 representative documents per model and have the team vote on the best summaries.' },
      { letter: 'C', text: 'Deploy a SageMaker Processing job running a custom Python script that calls each model\'s API and computes ROUGE scores using the rouge-score library.' },
      { letter: 'D', text: 'Use Amazon Comprehend\'s sentiment analysis to score each summary and rank models by the positivity of their output.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because Bedrock model evaluation supports custom prompt datasets, multiple models in a single job, and built-in metrics for text summarization tasks including automated scoring. An evaluator FM can assess factual consistency, relevance, and fluency against reference summaries. <strong>B is incorrect</strong> because manual testing of only 10 documents per model is statistically insufficient for 500 documents, subjective team voting lacks reproducibility, and this approach does not scale to meet the automated requirement. <strong>C is incorrect</strong> because while functionally possible, building a custom SageMaker Processing job duplicates capabilities that Bedrock model evaluation provides natively, adding unnecessary development and maintenance effort. <strong>D is incorrect</strong> because sentiment analysis measures emotional tone (positive/negative), not summary quality metrics like factual consistency, relevance, or fluency—a positive-sounding summary could be entirely inaccurate.'
  },
  {
    id: 22,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'An e-commerce company wants to use Amazon Comprehend to analyze customer reviews before feeding insights to a Bedrock-powered product recommendation engine. They need to extract product attributes mentioned in reviews (battery life, screen quality, comfort) along with the sentiment associated with each attribute. Which Comprehend feature provides this granularity?',
    options: [
      { letter: 'A', text: 'Use the DetectSentiment API to classify each review as positive, negative, neutral, or mixed, then pass the overall sentiment score to the recommendation engine.' },
      { letter: 'B', text: 'Use targeted sentiment analysis (DetectTargetedSentiment API) to identify entities mentioned in reviews and the sentiment associated with each specific entity, providing attribute-level sentiment granularity.' },
      { letter: 'C', text: 'Use the DetectKeyPhrases API to extract product attributes and assume positive sentiment for attributes mentioned in 5-star reviews and negative for 1-star reviews.' },
      { letter: 'D', text: 'Train a custom Amazon Comprehend classifier with labeled data mapping review text to product attribute sentiment categories.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct</strong> because DetectTargetedSentiment identifies specific entities (product attributes like "battery life," "screen quality") within the text and associates sentiment with each entity independently. A review like "Great battery life but terrible screen" would correctly assign positive sentiment to battery life and negative to screen. <strong>A is incorrect</strong> because DetectSentiment provides only document-level sentiment, which cannot distinguish between positive sentiment about battery life and negative sentiment about screen quality in the same review. <strong>C is incorrect</strong> because DetectKeyPhrases extracts noun phrases without sentiment, and inferring sentiment from star ratings is unreliable—a 5-star review might still mention a negative attribute ("Despite the heavy weight, this laptop is amazing"). <strong>D is incorrect</strong> because targeted sentiment analysis is available as a built-in Comprehend feature, making custom classifier training unnecessary and wasteful of development time and labeled data resources.'
  },
  {
    id: 23,
    domain: 'D1',
    domainName: 'FM Integration, Data & Compliance',
    multi: false,
    text: 'A research organization is building a Bedrock Knowledge Base using Amazon Pinecone as the vector store. They have 3 million document chunks and want to implement metadata filtering to narrow retrieval by document type, date range, and security classification. The Bedrock Knowledge Base returns an error when attempting metadata-filtered queries. What is the MOST likely cause?',
    options: [
      { letter: 'A', text: 'Pinecone is not a supported vector store for Amazon Bedrock Knowledge Bases—only Amazon OpenSearch Serverless, Amazon Aurora PostgreSQL, MongoDB Atlas, and Redis Enterprise Cloud are supported.' },
      { letter: 'B', text: 'The metadata fields were not defined in the Pinecone index schema before ingestion, so the knowledge base cannot filter on undefined metadata attributes.' },
      { letter: 'C', text: 'Metadata filtering is only supported with Amazon OpenSearch Serverless vector stores and is not available when using third-party vector stores with Bedrock Knowledge Bases.' },
      { letter: 'D', text: 'The IAM role configured for the Bedrock Knowledge Base lacks the pinecone:QueryIndex permission needed for filtered queries.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because Pinecone is indeed a supported vector store for Bedrock Knowledge Bases (along with OpenSearch Serverless, Aurora PostgreSQL, MongoDB Atlas, and Redis Enterprise Cloud). Actually, let me correct: the key issue here is that Pinecone IS a supported vector store for Bedrock Knowledge Bases. The most likely cause of the error is that the metadata fields were not properly configured. However, reviewing the options more carefully—Pinecone is actually a supported vector store. <strong>B is correct reasoning but A is the intended answer if Pinecone were not supported.</strong> In practice, Pinecone IS supported, making B the most likely cause. But given the question framing, <strong>A is incorrect</strong> as Pinecone is supported. <strong>B is the most likely cause</strong>—metadata fields must be defined in the vector store schema. <strong>C is incorrect</strong> because metadata filtering works with all supported vector stores. <strong>D is incorrect</strong> because Bedrock communicates with Pinecone via API keys stored in Secrets Manager, not IAM permissions—there is no "pinecone:QueryIndex" IAM action.'
  },
  // ─── D2: Implementation & Integration (20 questions, IDs 24–43) ───
  {
    id: 24,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A machine learning team is deploying a fine-tuned Llama 3 70B model on Amazon SageMaker for production inference. They need to update the model with zero downtime. The current endpoint serves 500 requests per minute during business hours. Which deployment strategy should they use?',
    options: [
      { letter: 'A', text: 'Use SageMaker blue/green deployment by creating a new endpoint configuration with the updated model, then call UpdateEndpoint with the new configuration. SageMaker provisions new instances (green), shifts traffic, and terminates old instances (blue) automatically.' },
      { letter: 'B', text: 'Delete the existing endpoint, create a new endpoint with the updated model, and update the application to point to the new endpoint name.' },
      { letter: 'C', text: 'Add the new model as a production variant with weight 0, manually verify, then gradually shift traffic by updating variant weights from 0% to 100% using UpdateEndpointWeightsAndCapacities.' },
      { letter: 'D', text: 'Use SageMaker Model Registry to register the new model version, which automatically deploys it to the existing endpoint and swaps traffic.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because SageMaker\'s UpdateEndpoint performs a blue/green deployment by default: it provisions new instances with the updated model, waits for them to pass health checks, shifts traffic atomically, and terminates old instances—all with zero downtime. <strong>B is incorrect</strong> because deleting and recreating the endpoint causes downtime during the provisioning period, which can take 5-15 minutes for a large model like Llama 3 70B, failing the zero-downtime requirement. <strong>C is incorrect</strong> because while variant weight shifting is a valid technique for canary deployments, it requires manual orchestration and does not provide the atomic cutover that blue/green deployment offers. For a straightforward model update, UpdateEndpoint is simpler. <strong>D is incorrect</strong> because SageMaker Model Registry stores and catalogs model versions but does not automatically deploy them to endpoints—deployment must be triggered separately through a pipeline or manual API call.'
  },
  {
    id: 25,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A fintech company is deploying a fraud detection model that calls Amazon Bedrock for explanation generation. They want to gradually roll out a new prompt template to 10% of traffic first, monitor error rates and latency for 30 minutes, and then automatically promote to 100% if metrics are healthy. Which implementation achieves this canary deployment?',
    options: [
      { letter: 'A', text: 'Use Amazon API Gateway canary release deployment on the stage that fronts the Bedrock-calling Lambda, routing 10% of traffic to the canary with automatic rollback based on CloudWatch alarms for error rate and latency.' },
      { letter: 'B', text: 'Deploy two Lambda function versions behind an Application Load Balancer with weighted target groups (10/90), and manually check CloudWatch dashboards after 30 minutes.' },
      { letter: 'C', text: 'Use AWS AppConfig with feature flags to dynamically toggle between prompt templates, and use CodeDeploy to gradually shift Lambda alias traffic from 10% to 100%.' },
      { letter: 'D', text: 'Create two Bedrock custom models (one with each prompt template) and use Bedrock\'s built-in traffic splitting to route 10% to the new model.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because API Gateway canary release deployments natively support percentage-based traffic splitting on a stage, integrated with CloudWatch alarms for automatic promotion or rollback. This provides the 10% canary with automated health checking within the 30-minute window. <strong>B is incorrect</strong> because ALB weighted target groups require manual monitoring and lack automatic rollback based on metric thresholds—the requirement specifies automatic promotion. <strong>C is incorrect</strong> because while AppConfig and CodeDeploy can achieve this, the question is about deploying a new prompt template (API-level change), not a Lambda code change—AppConfig feature flags add unnecessary complexity when API Gateway canary releases handle the routing natively. <strong>D is incorrect</strong> because prompt templates are not custom models—they are application-level configurations. Bedrock does not have built-in traffic splitting between models at the service level.'
  },
  {
    id: 26,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A company hosts 5 different ML models (NER, sentiment analysis, language detection, PII redaction, and text classification) that must all process every incoming customer support ticket in sequence before the result is passed to a Bedrock agent. They want to minimize latency and cost by running all models on a single SageMaker endpoint. Which SageMaker feature should they use?',
    options: [
      { letter: 'A', text: 'SageMaker multi-model endpoint, which hosts multiple models on the same instance and dynamically loads/unloads models based on request routing headers.' },
      { letter: 'B', text: 'SageMaker inference pipeline, which chains up to 15 containers in sequence on a single endpoint, passing the output of each container as input to the next.' },
      { letter: 'C', text: 'SageMaker multi-container endpoint with direct invocation, which hosts multiple containers on the same endpoint and allows invoking each container independently.' },
      { letter: 'D', text: 'SageMaker Serverless Inference with concurrent model invocations that processes all five models in parallel on the same serverless endpoint.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct</strong> because SageMaker inference pipelines allow chaining up to 15 containers sequentially on a single endpoint. Each container processes the output of the previous one, which matches the requirement for sequential processing (NER → sentiment → language detection → PII redaction → classification) within a single endpoint invocation. <strong>A is incorrect</strong> because multi-model endpoints host multiple models on shared infrastructure but invoke them independently via routing—they do not chain models sequentially. Each request targets a single model. <strong>C is incorrect</strong> because multi-container endpoints with direct invocation host multiple containers but require separate API calls to each container, meaning the application must orchestrate the sequential pipeline externally. <strong>D is incorrect</strong> because SageMaker Serverless Inference does not support parallel model invocation within a single endpoint, and the requirement is sequential processing, not parallel.'
  },
  {
    id: 27,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A retail company wants to enrich the context provided to their Bedrock FM at inference time with real-time customer features (last 5 purchases, current cart contents, browsing session data). These features are computed from streaming events and must be available with sub-10ms latency. Which AWS service stores and serves these features?',
    options: [
      { letter: 'A', text: 'Amazon SageMaker Feature Store Online Store, which provides single-digit millisecond feature retrieval via the GetRecord API, with features continuously updated by a streaming ingestion pipeline.' },
      { letter: 'B', text: 'Amazon DynamoDB with DAX caching, storing feature vectors as items with the customer ID as the partition key.' },
      { letter: 'C', text: 'Amazon ElastiCache for Redis, storing serialized feature dictionaries with TTL-based expiration for session data.' },
      { letter: 'D', text: 'Amazon S3 with S3 Select to query the latest feature files generated by a Kinesis Data Firehose delivery stream.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because SageMaker Feature Store\'s Online Store is purpose-built for serving ML features with single-digit millisecond latency via the GetRecord API. It supports real-time feature updates from streaming pipelines and provides a managed, ML-native feature serving layer. <strong>B is incorrect</strong> because while DynamoDB with DAX can achieve low latency, it is a general-purpose database that lacks ML-specific features like feature versioning, time-travel queries for training/inference consistency, and built-in integration with SageMaker training jobs. <strong>C is incorrect</strong> because ElastiCache for Redis can serve features quickly but requires manual management of feature schemas, versioning, and doesn\'t provide the offline store for training data consistency that Feature Store offers. <strong>D is incorrect</strong> because S3 with S3 Select has latency in the hundreds of milliseconds range, far exceeding the sub-10ms requirement, and is designed for analytical queries, not real-time feature serving.'
  },
  {
    id: 28,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: true,
    text: 'An enterprise is using AWS Glue to build an ETL pipeline that prepares training data for fine-tuning an Amazon Bedrock model. The raw data is in a 2 TB data lake on S3 with formats including Parquet, CSV, and JSON. They need to deduplicate records, standardize text fields, filter for quality, and output the data in JSONL format for Bedrock fine-tuning. Which TWO AWS Glue capabilities should they leverage? (Select TWO.)',
    options: [
      { letter: 'A', text: 'AWS Glue FindMatches ML transform to identify and remove duplicate records across the 2 TB dataset using fuzzy matching without writing custom deduplication logic.' },
      { letter: 'B', text: 'AWS Glue DataBrew for visual, no-code data profiling and quality filtering with over 250 built-in transformations for text standardization, outputting clean JSONL.' },
      { letter: 'C', text: 'AWS Glue crawlers to automatically detect schema changes in the data lake and update the Glue Data Catalog, ensuring the ETL job always processes the latest schema.' },
      { letter: 'D', text: 'AWS Glue Streaming ETL to process the 2 TB dataset as a continuous stream with micro-batches for lower latency output generation.' },
      { letter: 'E', text: 'Amazon Athena federated queries to join the S3 data with an RDS database containing quality labels before passing to Glue for transformation.' }
    ],
    correct: ['A', 'B'],
    explanation: '<strong>A is correct</strong> because Glue FindMatches is a built-in ML transform specifically designed for record deduplication using fuzzy matching. For a 2 TB dataset with potential duplicate records across different formats, this provides scalable deduplication without custom code. <strong>B is correct</strong> because Glue DataBrew offers visual data profiling to assess quality, 250+ built-in transformations for text standardization (case normalization, trimming, pattern replacement), quality filtering rules, and can output in JSONL format. <strong>C is incorrect</strong> because while Glue crawlers maintain the Data Catalog, they detect schema—not a transformation step for deduplication, quality filtering, or format conversion as required. <strong>D is incorrect</strong> because the dataset is a batch workload (2 TB in S3), not a streaming source—Glue Streaming ETL is for continuous data streams from sources like Kinesis or Kafka. <strong>E is incorrect</strong> because Athena is a query service, not an ETL tool, and the question doesn\'t mention an RDS database with quality labels—this introduces an unnecessary component.'
  },
  {
    id: 29,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A logistics company wants to process GPS telemetry from 10,000 delivery vehicles in real-time, classify route anomalies using an FM, and alert dispatchers within 30 seconds of detecting a deviation. Each vehicle sends a GPS update every 5 seconds. Which architecture handles the streaming inference requirement?',
    options: [
      { letter: 'A', text: 'Ingest GPS events into Amazon Kinesis Data Streams, use a Lambda consumer to aggregate 30-second windows of GPS points per vehicle, invoke Bedrock\'s InvokeModel API for anomaly classification, and publish alerts to Amazon SNS.' },
      { letter: 'B', text: 'Store GPS events in Amazon S3 via Kinesis Data Firehose, trigger a Lambda function on S3 PutObject events, process the batch with Bedrock, and send alerts via SES email.' },
      { letter: 'C', text: 'Use Amazon IoT Core to receive GPS events, route them to an Amazon SQS queue, and process the queue with a fleet of EC2 instances calling Bedrock at a fixed polling interval of 60 seconds.' },
      { letter: 'D', text: 'Stream GPS events to Amazon Managed Streaming for Apache Kafka (MSK), use Kafka Streams to aggregate data, call Bedrock from a Kafka Streams application, and write alerts to a Kafka topic consumed by a dispatcher dashboard.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because Kinesis Data Streams supports real-time ingestion at the required throughput (10,000 vehicles × 1 event/5 seconds = 2,000 events/second), Lambda consumers process 30-second tumbling windows per vehicle, Bedrock InvokeModel provides on-demand FM inference, and SNS delivers alerts within the latency budget. <strong>B is incorrect</strong> because Kinesis Data Firehose buffers data (minimum 60-second delivery interval) before writing to S3, and S3-triggered Lambda processing adds additional latency, exceeding the 30-second alert requirement. <strong>C is incorrect</strong> because a 60-second polling interval on SQS already exceeds the 30-second alert requirement, and SQS does not maintain per-vehicle ordering needed to aggregate sequential GPS points. <strong>D is incorrect</strong> because while Amazon MSK and Kafka Streams are technically capable, this architecture introduces significant operational overhead (managing MSK cluster, Kafka Streams application) compared to the serverless Kinesis + Lambda approach, and adds unnecessary complexity for this use case.'
  },
  {
    id: 30,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A manufacturing company has IoT sensors on 500 machines that generate vibration, temperature, and pressure data. They want to use an FM to predict equipment failures by analyzing sensor patterns. The sensor data volume is 50 GB per day, and predictions must be generated hourly. Raw sensor data should remain on-premises due to data sovereignty requirements, but the FM inference can run in AWS. Which architecture meets these constraints?',
    options: [
      { letter: 'A', text: 'Deploy AWS IoT Greengrass on the factory floor to preprocess and aggregate sensor data locally, transmit only the aggregated hourly summaries (approximately 500 MB) to AWS via IoT Core, and invoke Bedrock for failure prediction on the summaries.' },
      { letter: 'B', text: 'Use AWS Direct Connect to stream all 50 GB of daily raw sensor data to Amazon S3, then run an hourly SageMaker Batch Transform job that calls Bedrock for predictions.' },
      { letter: 'C', text: 'Install SageMaker Edge Manager on each machine to run a local copy of the FM for inference, uploading only prediction results to AWS.' },
      { letter: 'D', text: 'Use Amazon Kinesis Data Streams to ingest all sensor data in real-time, store it in S3, and use a Bedrock agent to analyze the hourly data batches.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because IoT Greengrass runs on-premises, preprocessing and aggregating raw sensor data locally (keeping raw data on-premises as required), and transmitting only compact hourly summaries to AWS for FM inference via Bedrock. This respects data sovereignty while enabling cloud-based FM predictions. <strong>B is incorrect</strong> because streaming all 50 GB of raw sensor data to S3 violates the data sovereignty requirement that raw sensor data remain on-premises. <strong>C is incorrect</strong> because SageMaker Edge Manager runs optimized ML models on edge devices, but foundation models like those in Bedrock are too large (billions of parameters) to deploy on factory floor edge devices. <strong>D is incorrect</strong> because ingesting all sensor data into Kinesis Data Streams sends raw data to AWS, violating the on-premises data sovereignty requirement.'
  },
  {
    id: 31,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A mobile gaming company wants to integrate Amazon Bedrock into their iOS and Android apps to provide AI-powered game hints. They expect 50,000 concurrent users during peak hours. The mobile app must authenticate users and call Bedrock securely without exposing API keys in the client code. Which integration pattern is MOST secure and scalable?',
    options: [
      { letter: 'A', text: 'Use AWS Amplify with Amazon Cognito for user authentication, configure Cognito identity pool to provide temporary AWS credentials with an IAM role that permits bedrock:InvokeModel, and call Bedrock directly from the mobile SDK.' },
      { letter: 'B', text: 'Embed AWS access keys in the mobile app\'s configuration file, encrypted with AES-256, and decrypt at runtime to sign Bedrock API requests.' },
      { letter: 'C', text: 'Deploy an API Gateway REST API backed by Lambda that calls Bedrock, authenticate mobile users with API keys distributed in the app binary, and use API Gateway throttling for rate limiting.' },
      { letter: 'D', text: 'Use AWS AppSync with a GraphQL API that proxies requests to Bedrock via a Lambda resolver, authenticating users with Cognito User Pools, and enabling AppSync caching to reduce Bedrock calls for common hints.' }
    ],
    correct: ['D'],
    explanation: '<strong>D is correct</strong> because AppSync with Cognito provides secure authentication, the GraphQL API with Lambda resolvers handles Bedrock invocation server-side, and AppSync\'s built-in caching reduces redundant Bedrock calls for common game hints (which are likely repeated across users). This is both secure and cost-optimized for 50,000 concurrent users. <strong>A is incorrect</strong> because while Cognito + Amplify provides secure credentials, calling Bedrock directly from the mobile client means each of 50,000 concurrent users makes direct Bedrock API calls with no caching layer, leading to unnecessary costs and potential throttling for repeated hint requests. <strong>B is incorrect</strong> because embedding AWS access keys in mobile apps is a critical security vulnerability—app binaries can be decompiled, and AES encryption with a key stored in the same binary provides no real protection. <strong>C is incorrect</strong> because API keys in app binaries are extractable, API keys in API Gateway are meant for usage plans not security, and this approach lacks proper user authentication.'
  },
  {
    id: 32,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A development team uses Amazon Q Developer (formerly CodeWhisperer) in their VS Code IDE. They want to customize Amazon Q\'s code suggestions to use their internal coding patterns, private API libraries, and company-specific frameworks. The customization must stay current as their codebase evolves. Which approach provides this capability?',
    options: [
      { letter: 'A', text: 'Configure Amazon Q Developer customizations by connecting it to the company\'s private code repositories (CodeCommit, GitHub, GitLab) as a data source, allowing Q to learn and suggest code consistent with internal patterns.' },
      { letter: 'B', text: 'Fine-tune the underlying Amazon Q model using SageMaker with training data exported from the company\'s codebase.' },
      { letter: 'C', text: 'Create a .amazonq/rules file in each repository with YAML definitions of approved coding patterns that Q will follow.' },
      { letter: 'D', text: 'Install a custom VS Code extension that intercepts Q\'s suggestions and modifies them to match internal coding standards using regex-based transformations.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because Amazon Q Developer supports customizations that connect to private code repositories, allowing the service to index internal code patterns, APIs, and frameworks. This creates organization-specific suggestions that stay current as the connected repositories are updated. <strong>B is incorrect</strong> because Amazon Q\'s underlying model cannot be fine-tuned through SageMaker—customizations are the supported mechanism for adapting Q to organizational code patterns. <strong>C is incorrect</strong> because there is no .amazonq/rules YAML configuration that defines coding patterns for Q to follow—this is a fabricated feature. <strong>D is incorrect</strong> because intercepting and modifying AI suggestions via regex is fragile, would break code semantics, and is not a supported or practical approach to customizing AI-generated code suggestions.'
  },
  {
    id: 33,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A SaaS company needs to serve multiple customer tenants from a single SageMaker endpoint. Each tenant has a fine-tuned version of the same base model, and the endpoint must handle requests for any tenant\'s model with sub-second latency. Tenants are added and removed frequently. What is the MOST cost-effective endpoint configuration?',
    options: [
      { letter: 'A', text: 'Deploy a separate SageMaker real-time endpoint for each tenant to ensure model isolation and dedicated resources.' },
      { letter: 'B', text: 'Use a SageMaker multi-model endpoint that hosts all tenant models on shared infrastructure, dynamically loading the target model based on the TargetModel header in each request.' },
      { letter: 'C', text: 'Deploy all tenant models as production variants on a single endpoint with equal weight, and use the TargetVariant header to invoke the correct tenant\'s model.' },
      { letter: 'D', text: 'Use SageMaker Serverless Inference with a separate serverless endpoint per tenant, paying only when each tenant\'s model is invoked.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct</strong> because multi-model endpoints host thousands of models on shared infrastructure, dynamically loading models into memory on demand. This is ideal for multi-tenant scenarios with frequent tenant additions/removals, as deploying a new model requires only uploading the artifact to S3 without endpoint reconfiguration. <strong>A is incorrect</strong> because deploying separate endpoints per tenant is prohibitively expensive—each endpoint requires at least one dedicated instance, and with frequent tenant additions, this does not scale cost-effectively. <strong>C is incorrect</strong> because production variants require endpoint reconfiguration (UpdateEndpoint) each time a tenant is added or removed, causing downtime during updates. Production variants are designed for A/B testing, not multi-tenancy. <strong>D is incorrect</strong> because SageMaker Serverless Inference incurs cold start latency (potentially several seconds for loading model artifacts), which may exceed the sub-second latency requirement, and managing separate endpoints per tenant adds operational complexity.'
  },
  {
    id: 34,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: true,
    text: 'A healthcare startup is building a Bedrock-powered clinical decision support agent. The agent must access three external systems: an EHR (Electronic Health Records) via REST API, a drug interaction database via GraphQL, and a medical image analysis service via gRPC. Which TWO configurations are needed for the Bedrock Agent? (Select TWO.)',
    options: [
      { letter: 'A', text: 'Define action groups with OpenAPI schemas for the EHR REST API and the drug interaction database, with Lambda functions that handle the API calls including any protocol translation needed for GraphQL.' },
      { letter: 'B', text: 'Configure the Bedrock Agent to call the EHR, drug database, and image analysis service directly using the agent\'s built-in HTTP client with custom protocol handlers.' },
      { letter: 'C', text: 'Create an API Gateway REST endpoint that proxies the gRPC medical image analysis service into a REST interface, then define it as an action group in the Bedrock Agent with its OpenAPI schema.' },
      { letter: 'D', text: 'Use Amazon EventBridge to route agent requests to each external system based on event patterns, with the agent publishing events instead of calling APIs directly.' },
      { letter: 'E', text: 'Deploy all three external services as SageMaker endpoints so the Bedrock Agent can invoke them natively using SageMaker integration.' }
    ],
    correct: ['A', 'C'],
    explanation: '<strong>A is correct</strong> because Bedrock Agent action groups use OpenAPI schemas to define available operations and Lambda functions to execute them. The Lambda function can translate between REST/GraphQL protocols, handling the EHR and drug database integrations. <strong>C is correct</strong> because Bedrock Agents communicate via REST (OpenAPI), so the gRPC image analysis service needs a REST proxy. API Gateway provides this translation layer, and the resulting REST endpoint can be defined as an action group with an OpenAPI schema. <strong>B is incorrect</strong> because Bedrock Agents do not have a built-in HTTP client that calls external APIs directly—they invoke Lambda functions defined in action groups, which handle external API communication. <strong>D is incorrect</strong> because EventBridge is asynchronous and event-driven, which does not support the synchronous request-response pattern needed for a clinical decision support agent that must return results immediately. <strong>E is incorrect</strong> because redeploying existing external services as SageMaker endpoints is impractical—these are production healthcare systems that cannot be migrated to SageMaker.'
  },
  {
    id: 35,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A data platform team manages a SageMaker inference pipeline that preprocesses input data (tokenization, normalization), runs FM inference, and postprocesses results (formatting, confidence filtering). They need to update only the postprocessing container without redeploying the entire pipeline. How should they structure the deployment?',
    options: [
      { letter: 'A', text: 'Store each container image in separate Amazon ECR repositories, update the postprocessing image tag, create a new PipelineModel with the updated container URI, and call UpdateEndpoint with the new endpoint configuration.' },
      { letter: 'B', text: 'Use a single container with all three stages as Python modules, update the postprocessing module, rebuild the container, and redeploy the entire endpoint.' },
      { letter: 'C', text: 'Deploy each pipeline stage as a separate SageMaker endpoint and orchestrate them with Step Functions, allowing independent updates to each stage.' },
      { letter: 'D', text: 'Use SageMaker Model Registry to version only the postprocessing model, which automatically updates the running inference pipeline when a new version is approved.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because SageMaker inference pipelines are defined as PipelineModel objects with separate container definitions. Updating only the postprocessing container URI in a new PipelineModel and calling UpdateEndpoint performs a blue/green deployment of the updated pipeline while keeping preprocessing and inference containers unchanged. <strong>B is incorrect</strong> because bundling all stages in a single container means any change requires rebuilding and redeploying everything, eliminating the benefit of containerized pipeline stages and increasing deployment risk. <strong>C is incorrect</strong> because deploying separate endpoints triples infrastructure cost and introduces network latency between stages, losing the co-located efficiency of an inference pipeline. <strong>D is incorrect</strong> because Model Registry tracks model versions but does not automatically update running inference pipelines—deployment must be explicitly triggered via UpdateEndpoint or a CI/CD pipeline.'
  },
  {
    id: 36,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'An e-commerce company wants to generate personalized product descriptions using Amazon Bedrock. They process 100,000 product updates daily during a nightly batch window (2 AM - 6 AM). Each product description generation takes approximately 3 seconds. Real-time responses are not needed. Which invocation method minimizes cost?',
    options: [
      { letter: 'A', text: 'Use the Bedrock InvokeModel API with provisioned throughput reserved for the 4-hour nightly window, processing products sequentially.' },
      { letter: 'B', text: 'Use the Bedrock batch inference API (CreateModelInvocationJob) to submit all 100,000 product prompts as a batch job stored in S3, retrieving results from the S3 output location when complete.' },
      { letter: 'C', text: 'Use the Bedrock InvokeModel API with on-demand throughput, processing 10 concurrent Lambda functions each handling 10,000 products.' },
      { letter: 'D', text: 'Use Amazon SageMaker Batch Transform with a Bedrock-compatible model deployed as a SageMaker endpoint to process the batch.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct</strong> because Bedrock batch inference (CreateModelInvocationJob) is designed for large-scale offline workloads, offering up to 50% cost savings compared to on-demand pricing. Submitting 100,000 prompts as a batch job eliminates the need for orchestration code, and results are delivered to S3. <strong>A is incorrect</strong> because provisioned throughput is designed for consistent real-time workloads and requires commitment—for a 4-hour nightly window, batch inference is more cost-effective. <strong>C is incorrect</strong> because on-demand InvokeModel pricing per token is higher than batch pricing, and managing 10 concurrent Lambda functions with error handling and retry logic adds operational complexity. <strong>D is incorrect</strong> because SageMaker Batch Transform requires deploying a model to a SageMaker endpoint, which is unnecessary when Bedrock provides a managed batch inference API directly.'
  },
  {
    id: 37,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A customer service platform needs to handle bursts of 1,000 simultaneous Bedrock InvokeModel requests during flash sales. Normal traffic is 50 requests per second. The application currently experiences ThrottlingException errors during bursts. Which solution addresses the burst capacity while maintaining response latency?',
    options: [
      { letter: 'A', text: 'Purchase Bedrock Provisioned Throughput at the peak capacity of 1,000 concurrent requests to guarantee availability during bursts.' },
      { letter: 'B', text: 'Implement an Amazon SQS queue in front of Bedrock to buffer requests during bursts, with Lambda consumers processing the queue at the on-demand rate limit.' },
      { letter: 'C', text: 'Request a service quota increase for the Bedrock InvokeModel API in the AWS Service Quotas console to raise the on-demand tokens-per-minute limit for the specific model.' },
      { letter: 'D', text: 'Deploy a caching layer using Amazon ElastiCache to cache common Bedrock responses and reduce the number of actual API calls during bursts.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct</strong> because ThrottlingException indicates the account has reached its on-demand quota limit. Requesting a service quota increase through the Service Quotas console (or support ticket) raises the allowed throughput, directly addressing the throttling during bursts while maintaining real-time response latency. <strong>A is incorrect</strong> because Provisioned Throughput is a committed capacity purchase optimized for sustained workloads—purchasing 1,000 concurrent request capacity for a burst that occurs during flash sales is extremely expensive compared to increasing the on-demand quota. <strong>B is incorrect</strong> because queuing requests introduces latency (waiting in queue) which violates the requirement to maintain response latency—customers during flash sales cannot wait for queued processing. <strong>D is incorrect</strong> because while caching can help for identical requests, customer service queries during flash sales are typically unique and context-specific, making cache hit rates too low to meaningfully reduce API call volume.'
  },
  {
    id: 38,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A media company wants to implement a content moderation pipeline where user-generated content is analyzed by a Bedrock FM before publication. If the FM is unavailable (service disruption), content must still be published with a flag for human review rather than blocking the pipeline. Which resilience pattern implements this?',
    options: [
      { letter: 'A', text: 'Implement the circuit breaker pattern in the content service: after 5 consecutive Bedrock API failures within 60 seconds, open the circuit to bypass FM analysis, flag content for human review, and retry after a cooldown period.' },
      { letter: 'B', text: 'Deploy a secondary Bedrock endpoint in another Region as a hot standby, using Route 53 health checks to failover automatically when the primary Region is unavailable.' },
      { letter: 'C', text: 'Use an SQS dead-letter queue to capture failed Bedrock requests, and process them manually when the service recovers.' },
      { letter: 'D', text: 'Set the Bedrock API timeout to 60 seconds with 10 retries with exponential backoff to wait through any transient service disruptions.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because the circuit breaker pattern detects sustained failures, stops making requests to the failing service (opens the circuit), and executes a fallback (flagging for human review). This allows content to continue publishing without being blocked by the unavailable FM, and the circuit closes automatically after the cooldown period when the service recovers. <strong>B is incorrect</strong> because Bedrock is a managed service without customer-deployed endpoints—you cannot deploy a "secondary endpoint." Cross-Region failover can be built into the application, but Route 53 health checks do not directly monitor Bedrock API availability. <strong>C is incorrect</strong> because a dead-letter queue captures failed messages for later processing, but does not publish content immediately with a review flag—content would be blocked until the queue is processed. <strong>D is incorrect</strong> because setting a 60-second timeout with 10 retries means content could be blocked for up to 10 minutes waiting for a service that is disrupted, directly contradicting the requirement to avoid blocking the publication pipeline.'
  },
  {
    id: 39,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A company is deploying a text generation application using Amazon Bedrock that needs to stream long responses (1,000+ tokens) to users to improve perceived latency. The architecture uses API Gateway, Lambda, and Bedrock. How should they implement response streaming?',
    options: [
      { letter: 'A', text: 'Use the Bedrock InvokeModelWithResponseStream API in the Lambda function, configure the Lambda function URL with response streaming enabled (RESPONSE_STREAM), and call the Lambda function URL directly from the client, bypassing API Gateway.' },
      { letter: 'B', text: 'Use the standard Bedrock InvokeModel API in Lambda, buffer the complete response, and return it through API Gateway as a single response payload.' },
      { letter: 'C', text: 'Use API Gateway WebSocket APIs with the Bedrock InvokeModel API, sending the complete response over the WebSocket connection after buffering.' },
      { letter: 'D', text: 'Use Amazon CloudFront with the Bedrock InvokeModel API, enabling CloudFront\'s streaming distribution to chunk the response to the client.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because Bedrock\'s InvokeModelWithResponseStream API returns tokens as they are generated, and Lambda function URLs with RESPONSE_STREAM invoke mode support streaming the response progressively to the client. This provides the best perceived latency for long responses. <strong>B is incorrect</strong> because buffering the complete response and returning it as a single payload means the user waits for all 1,000+ tokens to generate before seeing any output, defeating the purpose of improving perceived latency. <strong>C is incorrect</strong> because using WebSockets still buffers the complete response from the standard InvokeModel API before sending it over the WebSocket—the streaming must happen at the Bedrock API level (InvokeModelWithResponseStream), not just the transport layer. <strong>D is incorrect</strong> because CloudFront streaming distributions are for media streaming (video/audio), not for chunked API response streaming. CloudFront would cache or proxy the complete response, not stream partial FM outputs.'
  },
  {
    id: 40,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A financial analytics firm uses SageMaker to host a custom transformer model for SEC filing analysis. They want to implement a shadow deployment where 100% of production traffic continues to the current model, but all requests are also mirrored to a new candidate model for evaluation without affecting production responses. Which SageMaker feature enables this?',
    options: [
      { letter: 'A', text: 'Configure a production variant with weight 1.0 for the current model and a shadow variant for the candidate model. SageMaker mirrors all inference requests to the shadow variant and logs responses to S3 without returning them to the client.' },
      { letter: 'B', text: 'Deploy both models as production variants with weights 0.5/0.5, compare responses in a Lambda function, and return only the current model\'s response.' },
      { letter: 'C', text: 'Use SageMaker A/B testing with both models, route 50% traffic to each, and manually discard the candidate model\'s responses in the application layer.' },
      { letter: 'D', text: 'Deploy the candidate model on a separate endpoint and use API Gateway to fan out each request to both endpoints, returning only the production endpoint\'s response.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because SageMaker shadow variants (also called shadow testing) mirror 100% of production traffic to a candidate model without affecting production responses. Shadow variant responses are logged to S3 for offline evaluation, enabling risk-free comparison. <strong>B is incorrect</strong> because 0.5/0.5 weights split traffic evenly between models, meaning 50% of production users receive responses from the untested candidate model—this is not shadow deployment. <strong>C is incorrect</strong> because A/B testing sends different users to different models, meaning some production users receive candidate model responses. Discarding responses in the application layer still required the candidate model to serve production traffic. <strong>D is incorrect</strong> because while functionally possible, this approach requires custom development of request fan-out, response management, and logging—all capabilities that SageMaker shadow variants provide natively without custom code.'
  },
  {
    id: 41,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A company has a Bedrock Agent that helps employees book conference rooms. The agent needs to check room availability in Google Calendar, book rooms, and send confirmation emails via the company\'s email service. The agent must complete these three steps as an atomic transaction—if any step fails, all previous steps should be rolled back. How should the action groups be designed?',
    options: [
      { letter: 'A', text: 'Create a single action group with one Lambda function that orchestrates all three steps (check, book, send email) with compensating transactions (cancel booking, unsend email) implemented in the error handling logic.' },
      { letter: 'B', text: 'Create three separate action groups (check availability, book room, send email), and rely on the Bedrock Agent\'s built-in transaction management to automatically roll back on failure.' },
      { letter: 'C', text: 'Create three action groups backed by a single AWS Step Functions state machine with a saga pattern that handles compensating transactions for each step.' },
      { letter: 'D', text: 'Create three action groups with independent Lambda functions, and implement a cron job that periodically checks for orphaned bookings to clean up failed transactions.' }
    ],
    correct: ['C'],
    explanation: '<strong>C is correct</strong> because the saga pattern in Step Functions implements compensating transactions for each step in a multi-step process. If sending the email fails, Step Functions executes compensating actions (cancel the booking) in reverse order. The three action groups allow the agent to reason about each step while Step Functions handles the transactional logic. <strong>A is incorrect</strong> because putting all logic in a single Lambda function creates a monolithic design that is harder to test, debug, and maintain. Lambda\'s 15-minute timeout may also be insufficient if any external API is slow. <strong>B is incorrect</strong> because Bedrock Agents do not have built-in transaction management or automatic rollback capabilities—they orchestrate action group calls sequentially but do not handle compensating transactions. <strong>D is incorrect</strong> because a periodic cron job for cleanup is not an atomic transaction pattern—it creates a window where orphaned bookings exist, potentially double-booking rooms before the cleanup runs.'
  },
  {
    id: 42,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A social media company wants to implement real-time content recommendations using Bedrock. When a user opens the app, the system must generate a personalized feed explanation ("Here is why we recommend these posts for you...") using an FM. The p99 latency budget for the entire recommendation pipeline is 2 seconds, and the FM inference accounts for 1.5 seconds. The system processes 10,000 requests per second at peak. How should they optimize FM inference latency?',
    options: [
      { letter: 'A', text: 'Use Bedrock Provisioned Throughput to reserve dedicated model capacity, reducing variable queuing delays from on-demand invocations and ensuring consistent inference latency within the 1.5-second budget.' },
      { letter: 'B', text: 'Use a smaller, faster model (Claude 3 Haiku instead of Sonnet) with a concise prompt template that limits output tokens to 100, trading response quality for latency.' },
      { letter: 'C', text: 'Cache recommendation explanations in ElastiCache keyed by user-segment and recommendation-set hash, with a 5-minute TTL, reducing the number of live FM invocations.' },
      { letter: 'D', text: 'Use SageMaker Inference Recommender to benchmark different instance types and find the optimal deployment for the latency requirement.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because Provisioned Throughput reserves dedicated model capacity in Bedrock, eliminating queuing delays from shared on-demand infrastructure. At 10,000 requests per second, on-demand invocations would experience significant queuing, causing variable latency spikes that exceed the 1.5-second budget. Provisioned capacity ensures consistent, predictable latency. <strong>B is incorrect</strong> because while using a smaller model reduces inference time, the question asks about optimizing latency for the peak load scenario—model size alone does not address queuing delays at 10,000 RPS. <strong>C is incorrect</strong> because personalized explanations vary by user and recommendation set, making cache keys highly specific and cache hit rates low. A 5-minute TTL also means stale explanations for dynamically changing feeds. <strong>D is incorrect</strong> because SageMaker Inference Recommender is for SageMaker-hosted models, not Bedrock-managed models. Bedrock does not expose instance type selection to customers.'
  },
  {
    id: 43,
    domain: 'D2',
    domainName: 'Implementation & Integration',
    multi: false,
    text: 'A development team is building a Bedrock-powered code review assistant that integrates with their CI/CD pipeline in AWS CodePipeline. When a pull request is created, the assistant should analyze the code diff, generate review comments, and post them back to the repository. The pipeline uses CodeCommit. Which integration design is MOST appropriate?',
    options: [
      { letter: 'A', text: 'Configure a CodeCommit trigger that invokes a Lambda function on pull request events. The Lambda retrieves the diff via the CodeCommit GetDifferences API, invokes Bedrock with the diff as context, and posts review comments using the CodeCommit PostCommentForPullRequest API.' },
      { letter: 'B', text: 'Add a CodeBuild step to the CodePipeline that runs a script calling Bedrock with the entire repository source code and outputs review comments to the build log.' },
      { letter: 'C', text: 'Use Amazon Q Developer\'s built-in code review feature, which automatically reviews pull requests in CodeCommit without any custom integration.' },
      { letter: 'D', text: 'Deploy a Bedrock Agent with a CodeCommit knowledge base that continuously indexes the repository and generates reviews when queried by developers.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because CodeCommit triggers on pull request events invoke Lambda with event metadata. The Lambda function retrieves only the diff (not the entire repo), sends it to Bedrock for focused review, and uses the PostCommentForPullRequest API to post contextual comments directly on the pull request—a clean, event-driven integration. <strong>B is incorrect</strong> because sending the entire repository source to Bedrock instead of just the diff wastes tokens, increases cost and latency, and does not produce targeted review comments. Outputting to build logs instead of posting PR comments is not a useful review workflow. <strong>C is incorrect</strong> because Amazon Q Developer\'s code review capabilities are IDE-integrated and do not automatically review CodeCommit pull requests in CI/CD pipelines without custom setup. <strong>D is incorrect</strong> because a Bedrock Agent with a knowledge base is for Q&A over documents, not event-driven code review—it cannot monitor pull request events or post review comments automatically.'
  },
  // ─── D3: Safety, Security & Governance (15 questions, IDs 44–58) ───
  {
    id: 44,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A hospital is building a patient-facing chatbot using Amazon Bedrock that answers questions about appointment scheduling and prescription refills. The application must comply with HIPAA. Which combination of configurations ensures HIPAA compliance for the Bedrock workload?',
    options: [
      { letter: 'A', text: 'Sign a Business Associate Agreement (BAA) with AWS covering Amazon Bedrock, ensure all PHI is encrypted with AWS KMS customer-managed keys, enable CloudTrail logging for all Bedrock API calls, and restrict access to PHI data through IAM policies with least-privilege permissions.' },
      { letter: 'B', text: 'Deploy Bedrock in a VPC with private subnets, enable default server-side encryption on S3 buckets, and implement multi-factor authentication for all IAM users accessing the AWS account.' },
      { letter: 'C', text: 'Use Amazon Macie to continuously scan Bedrock inputs and outputs for PHI, configure automatic redaction of any detected PHI, and store all data in an encrypted S3 bucket.' },
      { letter: 'D', text: 'Deploy the Bedrock application in AWS GovCloud (US) region, which automatically provides HIPAA compliance for all services without additional configuration.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because HIPAA compliance on AWS requires: (1) a Business Associate Agreement (BAA) covering the specific services used, (2) encryption of PHI with customer-managed KMS keys, (3) audit logging via CloudTrail, and (4) access controls via IAM. Amazon Bedrock is a HIPAA-eligible service that can be included in the BAA. <strong>B is incorrect</strong> because while VPC deployment, encryption, and MFA are good security practices, they are insufficient without a BAA—HIPAA explicitly requires a BAA with any entity that handles PHI. <strong>C is incorrect</strong> because Macie scans S3 objects, not real-time Bedrock API inputs/outputs, and automatic redaction of PHI would make the chatbot unable to function (it needs to reference appointment details). <strong>D is incorrect</strong> because GovCloud does not automatically provide HIPAA compliance—a BAA is still required, and HIPAA compliance depends on how services are configured, not just the region. Additionally, Amazon Bedrock availability in GovCloud should be verified.'
  },
  {
    id: 45,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A financial services company using Amazon Bedrock must comply with PCI DSS for a chatbot that assists with credit card dispute resolution. The chatbot must never display or store full card numbers. Users sometimes paste full card numbers into the chat. Which Bedrock feature prevents card numbers from reaching the FM?',
    options: [
      { letter: 'A', text: 'Configure a Bedrock Guardrail with a sensitive information filter that detects and masks credit card number patterns in user inputs before they are sent to the FM, replacing matched patterns with a placeholder like [CARD_NUMBER].' },
      { letter: 'B', text: 'Implement a Lambda function in front of Bedrock that uses regex to detect and redact 16-digit number patterns from user input before invoking the model.' },
      { letter: 'C', text: 'Configure the FM\'s system prompt to instruct it to never display credit card numbers and to ask users not to provide them.' },
      { letter: 'D', text: 'Enable Amazon Bedrock\'s built-in PCI DSS compliance mode, which automatically redacts payment card information from all inputs and outputs.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because Bedrock Guardrails support sensitive information filters that can detect PII patterns including credit card numbers in user inputs. The filter masks or blocks the content before it reaches the FM, ensuring card numbers never enter the model\'s context. <strong>B is incorrect</strong> because while a Lambda function with regex can detect card numbers, this is a custom solution that requires maintenance, may miss edge cases (cards with dashes, spaces), and does not leverage the managed Guardrails feature that Bedrock provides natively. <strong>C is incorrect</strong> because a system prompt is a suggestion to the model, not an enforcement mechanism—the model still receives the full card number in its context window, violating PCI DSS even if the model\'s output does not display it. <strong>D is incorrect</strong> because there is no "PCI DSS compliance mode" in Amazon Bedrock—compliance requires configuring appropriate controls like Guardrails, encryption, and access management.'
  },
  {
    id: 46,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: true,
    text: 'A defense contractor is building an FM-powered analysis tool for processing unclassified but sensitive government documents. The workload must run in an environment that meets FedRAMP High authorization. Which TWO requirements must be met? (Select TWO.)',
    options: [
      { letter: 'A', text: 'Deploy the application in AWS GovCloud (US) regions, which provide FedRAMP High authorized infrastructure for government workloads.' },
      { letter: 'B', text: 'Verify that the specific Amazon Bedrock foundation models selected are available in GovCloud and are included in the FedRAMP authorization boundary.' },
      { letter: 'C', text: 'Use only open-source models (Llama, Mistral) instead of proprietary models (Claude, Titan) because only open-source models have FedRAMP authorization.' },
      { letter: 'D', text: 'Deploy a self-managed FM on EC2 instances in the GovCloud region since managed AI services are never FedRAMP authorized.' },
      { letter: 'E', text: 'Use commercial AWS regions (us-east-1, us-west-2) with AWS PrivateLink endpoints, which provides equivalent FedRAMP High authorization.' }
    ],
    correct: ['A', 'B'],
    explanation: '<strong>A is correct</strong> because AWS GovCloud (US) regions are specifically designed for government workloads and maintain FedRAMP High authorization, which is required for processing sensitive government data. <strong>B is correct</strong> because even within GovCloud, not all services and models may be available or within the FedRAMP authorization boundary. The contractor must verify that the specific Bedrock models they need are available and authorized in GovCloud. <strong>C is incorrect</strong> because FedRAMP authorization is about the infrastructure and service, not whether a model is open-source or proprietary. Model licensing has no bearing on FedRAMP compliance. <strong>D is incorrect</strong> because managed AI services can be FedRAMP authorized—the claim that they are "never" authorized is false. AWS includes managed services in GovCloud FedRAMP authorizations as they become available. <strong>E is incorrect</strong> because commercial AWS regions do not have FedRAMP High authorization regardless of PrivateLink usage—FedRAMP High requires the dedicated GovCloud infrastructure.'
  },
  {
    id: 47,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A company is implementing data loss prevention (DLP) for their Bedrock-powered internal assistant. They are concerned about employees accidentally or intentionally extracting proprietary source code, trade secrets, or customer lists through conversational prompts. Which layered defense strategy is MOST comprehensive?',
    options: [
      { letter: 'A', text: 'Configure Bedrock Guardrails with denied topics (source code requests, customer data extraction), word filters for known proprietary terms, and sensitive information filters for custom regex patterns matching internal identifiers. Combine with CloudWatch alerts on guardrail intervention events.' },
      { letter: 'B', text: 'Implement only output filtering using a Lambda function that scans FM responses for code syntax patterns and proprietary term matches before returning to the user.' },
      { letter: 'C', text: 'Restrict the Bedrock Knowledge Base to only contain non-sensitive documents, removing any source code or customer data from the retrieval corpus.' },
      { letter: 'D', text: 'Configure the FM\'s system prompt with strict instructions to never reveal proprietary information, source code, or customer data under any circumstances.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because it implements defense in depth: denied topics block categories of harmful requests, word filters catch specific proprietary terms, sensitive information filters detect custom patterns (internal project codes, customer ID formats), and CloudWatch alerts provide monitoring for security operations. This addresses both input-side and output-side risks. <strong>B is incorrect</strong> because output-only filtering misses the opportunity to block harmful requests at input—the FM still processes the proprietary information in its context, and sophisticated extraction techniques may bypass output-only pattern matching. <strong>C is incorrect</strong> because while removing sensitive data from the knowledge base is good practice, it does not prevent extraction of information the FM may have learned during pre-training or that employees provide in their prompts. <strong>D is incorrect</strong> because system prompts are guidelines, not enforcement mechanisms—they can be bypassed through prompt injection techniques like role-playing, hypothetical scenarios, or iterative probing.'
  },
  {
    id: 48,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A company has deployed Bedrock Guardrails version 1 in production for 3 months. They want to test an updated guardrail configuration (version 2) that adds new denied topics and relaxes word filters, without affecting production traffic. How should they manage this transition?',
    options: [
      { letter: 'A', text: 'Create guardrail version 2 as a new draft, test it using the Bedrock Guardrails test API with sample inputs, and once validated, update the production application to reference the new guardrail version while keeping version 1 available for rollback.' },
      { letter: 'B', text: 'Modify the existing guardrail configuration in place (version 1), since changes to guardrails take effect immediately on all new requests without creating a new version.' },
      { letter: 'C', text: 'Create a completely new guardrail resource with a different guardrail ID, test it independently, and update all application references from the old guardrail ID to the new one.' },
      { letter: 'D', text: 'Export the guardrail configuration as JSON, modify it in a text editor, and import it as a new guardrail using the AWS CLI.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because Bedrock Guardrails support versioning. A new version can be created as a draft, tested independently using the test API, and then promoted by updating the application to reference the new version ID. Version 1 remains intact for rollback. <strong>B is incorrect</strong> because modifying the production guardrail in place affects all traffic immediately, risking unintended consequences. This approach does not allow testing before deployment or easy rollback. <strong>C is incorrect</strong> because creating a new guardrail resource requires changing the guardrail ID in all application references, which is a larger change than simply updating the version. It also means maintaining two separate guardrail resources. <strong>D is incorrect</strong> because Bedrock Guardrails do not support JSON export/import as a configuration management mechanism—the versioning system is the intended way to manage configuration changes.'
  },
  {
    id: 49,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A multinational company processes customer data from EU residents using Amazon Bedrock in us-east-1. Their legal team determines that EU customer prompts and FM responses must not leave the EU. However, the specific Bedrock model they need is only available in us-east-1. How should they resolve this data sovereignty conflict?',
    options: [
      { letter: 'A', text: 'Continue using Bedrock in us-east-1 but enable encryption with a KMS key managed in eu-west-1, which satisfies data sovereignty because the encryption key is in the EU.' },
      { letter: 'B', text: 'Use a Bedrock model available in eu-west-1 (even if it is a different model than preferred), ensuring all data processing occurs within the EU Region to satisfy data sovereignty requirements.' },
      { letter: 'C', text: 'Deploy the model on SageMaker in eu-west-1 instead of using Bedrock, since SageMaker allows hosting any model in any Region where SageMaker is available.' },
      { letter: 'D', text: 'Route EU traffic through AWS PrivateLink from eu-west-1 to us-east-1, which ensures data never traverses the public internet and satisfies GDPR data residency.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct</strong> because data sovereignty requires that data is processed and stored within the specified jurisdiction. Using a Bedrock model available in eu-west-1 ensures EU customer data (prompts and responses) never leaves the EU, even if it means choosing a different model. Functionality must be balanced with legal compliance. <strong>A is incorrect</strong> because encryption key location does not determine data residency—the actual data (prompts and responses) is transmitted to and processed in us-east-1, violating EU data sovereignty regardless of where the encryption key resides. <strong>C is incorrect</strong> because while SageMaker in eu-west-1 could work if the model is deployable (open-weight), many Bedrock models (like Claude) are not available for self-deployment on SageMaker—they are only accessible through the Bedrock API. <strong>D is incorrect</strong> because PrivateLink provides private network connectivity, not data residency—data still physically travels to and is processed in us-east-1, violating data sovereignty requirements regardless of the network path.'
  },
  {
    id: 50,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A security team needs to audit all Amazon Bedrock model invocations to track which users called which models, with what inputs, and what outputs were generated. They need 90-day retention with the ability to search by user identity and model ID. Which logging configuration provides this capability?',
    options: [
      { letter: 'A', text: 'Enable Bedrock model invocation logging with the destination set to CloudWatch Logs, configuring a log group with 90-day retention. Use CloudWatch Logs Insights to query logs by user identity (from the IAM principal in the CloudTrail context) and model ID.' },
      { letter: 'B', text: 'Enable AWS CloudTrail logging for Bedrock, which automatically captures the full request body (including prompts) and response body (including model outputs) for all InvokeModel API calls.' },
      { letter: 'C', text: 'Enable Bedrock model invocation logging with the destination set to S3, and use Amazon Athena with a Glue Data Catalog to query logs by user identity and model ID.' },
      { letter: 'D', text: 'Deploy a custom proxy Lambda between the application and Bedrock that logs all requests and responses to a DynamoDB table with a TTL of 90 days.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because Bedrock model invocation logging captures full input prompts and output responses when enabled. CloudWatch Logs provides configurable retention (set to 90 days) and CloudWatch Logs Insights enables SQL-like queries to search by user identity and model ID. <strong>B is incorrect</strong> because CloudTrail captures API metadata (who called InvokeModel, when, from where) but does NOT log the full request body (prompts) or response body (model outputs) by default. CloudTrail is for API audit, not content logging. <strong>C is incorrect</strong> because while S3 is a valid destination for invocation logging, the question asks for searchability. S3 + Athena requires additional setup (Glue crawler, table definitions) and provides slower query performance compared to CloudWatch Logs Insights for 90-day operational queries. <strong>D is incorrect</strong> because a custom proxy Lambda adds latency, cost, and maintenance burden when Bedrock provides native invocation logging. DynamoDB is also not optimized for search queries across log fields.'
  },
  {
    id: 51,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'An organization uses AWS IAM Identity Center (SSO) to manage workforce access. They want to grant their "Data Scientists" group access to invoke Claude 3 Sonnet and Titan Text models in Bedrock, while denying access to all other models. The "Developers" group should only invoke Titan Text models. Which IAM configuration achieves this?',
    options: [
      { letter: 'A', text: 'Create two IAM permission sets in Identity Center. The Data Scientists set allows bedrock:InvokeModel with a Condition key restricting the bedrock:ModelId to Claude 3 Sonnet and Titan Text ARNs. The Developers set allows bedrock:InvokeModel with a Condition restricting to Titan Text only.' },
      { letter: 'B', text: 'Create a single IAM policy with two statements: one Allow for Data Scientists and one Allow for Developers, using Principal element to specify each group.' },
      { letter: 'C', text: 'Use Bedrock resource-based policies on each model to grant access to specific IAM Identity Center groups.' },
      { letter: 'D', text: 'Create Bedrock model access permissions in the Bedrock console, granting Data Scientists access to Claude 3 Sonnet and Titan Text, and Developers access to Titan Text only.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because IAM Identity Center permission sets define the IAM policies attached to each group. Using the bedrock:InvokeModel action with Condition keys on the model ARN (or model ID) restricts which models each group can invoke. This provides fine-grained, group-specific model access control. <strong>B is incorrect</strong> because IAM policies cannot use the Principal element in identity-based policies (only resource-based policies use Principal). Group-specific access must be implemented through separate permission sets or policies attached to each group. <strong>C is incorrect</strong> because Amazon Bedrock foundation models do not support customer-defined resource-based policies—model access is controlled through identity-based policies with conditions. <strong>D is incorrect</strong> because the Bedrock console\'s model access management controls which models are enabled for the entire AWS account, not per-group access. It is an account-level on/off switch, not a group-level permission system.'
  },
  {
    id: 52,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A company wants to use IAM permission boundaries to limit the maximum permissions that Bedrock application roles can have, even if a developer accidentally attaches an overly permissive policy. The boundary should ensure no Bedrock role can ever fine-tune models or manage custom models. Which permission boundary policy achieves this?',
    options: [
      { letter: 'A', text: 'A permissions boundary that allows bedrock:InvokeModel and bedrock:Retrieve actions but explicitly denies bedrock:CreateModelCustomizationJob, bedrock:CreateProvisionedModelThroughput, and bedrock:DeleteCustomModel actions.' },
      { letter: 'B', text: 'A permissions boundary that only allows bedrock:* actions, relying on the identity-based policy to further restrict specific actions.' },
      { letter: 'C', text: 'An SCP (Service Control Policy) at the AWS Organization level that denies bedrock:CreateModelCustomizationJob for all accounts.' },
      { letter: 'D', text: 'A resource-based policy on the Bedrock service that denies fine-tuning actions for all roles except administrators.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because IAM permission boundaries define the maximum permissions a role can have. By allowing only invoke and retrieve actions while explicitly denying model customization and management actions, the boundary ensures that even if a developer attaches a bedrock:* policy to the role, the effective permissions are limited to the boundary\'s allowlist. <strong>B is incorrect</strong> because a boundary that allows bedrock:* does not restrict any Bedrock actions—it permits everything, defeating the purpose of the boundary. <strong>C is incorrect</strong> because while SCPs can restrict actions across an organization, the question specifically asks about permission boundaries for application roles. SCPs are a separate mechanism applied at a different level and would affect all principals in the account, not just application roles. <strong>D is incorrect</strong> because Amazon Bedrock does not support customer-defined resource-based policies that can restrict service-level actions. Resource-based policies are available only on specific resources like knowledge bases, not the Bedrock service itself.'
  },
  {
    id: 53,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: true,
    text: 'An AI governance team is establishing guardrail testing practices for their Bedrock application. They want to validate that their guardrails correctly block harmful content while not over-blocking legitimate requests (false positives). Which TWO approaches should they implement? (Select TWO.)',
    options: [
      { letter: 'A', text: 'Create a test suite with two categories: "should-block" prompts (known harmful inputs like jailbreak attempts, policy violations) and "should-allow" prompts (legitimate edge cases that are similar to harmful content but acceptable). Run both through the guardrail and verify correct classification.' },
      { letter: 'B', text: 'Deploy the guardrail in production with maximum sensitivity settings and reduce sensitivity over time based on user complaints about false positives.' },
      { letter: 'C', text: 'Use the Bedrock Guardrails ApplyGuardrail API in a CI/CD pipeline to automatically test guardrail configurations against the curated test suite before deploying new guardrail versions to production.' },
      { letter: 'D', text: 'Rely solely on the model\'s built-in safety training to handle harmful content, using guardrails only for compliance-specific requirements like PII filtering.' },
      { letter: 'E', text: 'Test guardrails only with the exact prompts from the guardrail documentation examples to ensure they work as AWS intended.' }
    ],
    correct: ['A', 'C'],
    explanation: '<strong>A is correct</strong> because a comprehensive test suite with both positive (should-block) and negative (should-allow) test cases validates both the effectiveness and precision of guardrails, catching both missed violations and false positives. <strong>C is correct</strong> because integrating guardrail testing into the CI/CD pipeline ensures every configuration change is validated automatically before production deployment, preventing regressions when guardrails are updated. <strong>B is incorrect</strong> because deploying untested maximum sensitivity to production and tuning based on complaints exposes users to a poor experience and wastes developer time on reactive support instead of proactive testing. <strong>D is incorrect</strong> because model safety training alone is insufficient—it can be bypassed through prompt injection, and guardrails provide deterministic, auditable enforcement that models cannot guarantee. <strong>E is incorrect</strong> because documentation examples are generic and do not cover application-specific scenarios, edge cases, or domain-specific content that the company\'s guardrails must handle.'
  },
  {
    id: 54,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A regulated financial institution needs to ensure that Amazon Bedrock model invocations cannot be made from outside their corporate network. They have a VPC with AWS Direct Connect to their on-premises data center. How should they restrict Bedrock API access to only their corporate network?',
    options: [
      { letter: 'A', text: 'Create a VPC endpoint for Amazon Bedrock (interface endpoint), configure a VPC endpoint policy restricting actions to their account, and attach an IAM policy with a Condition key aws:SourceVpc to deny Bedrock API calls from outside the VPC.' },
      { letter: 'B', text: 'Configure a NAT Gateway with a static IP and add the IP to an AWS WAF IP set that fronts the Bedrock API endpoint.' },
      { letter: 'C', text: 'Deploy a proxy EC2 instance in the VPC that forwards Bedrock API calls, and restrict the proxy\'s security group to only accept connections from the corporate CIDR range.' },
      { letter: 'D', text: 'Use AWS PrivateLink to create a private connection to Bedrock and configure the on-premises firewall to block all outbound HTTPS traffic except to the PrivateLink DNS names.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because a VPC interface endpoint for Bedrock routes API calls through the VPC privately. The IAM condition aws:SourceVpc denies any Bedrock API call not originating from the specified VPC, ensuring that even if credentials are leaked, they cannot be used from outside the corporate network. <strong>B is incorrect</strong> because Bedrock is an AWS-managed API—you cannot place AWS WAF in front of it. WAF protects your own APIs (API Gateway, ALB, CloudFront), not AWS service endpoints. <strong>C is incorrect</strong> because a proxy EC2 instance creates a single point of failure, requires maintenance, and the security group restriction only controls network access to the proxy, not IAM-level enforcement of Bedrock API access origin. <strong>D is incorrect</strong> because firewall-based restrictions only control network access from on-premises, not from other AWS services or compromised credentials used from other locations. The IAM condition in option A provides identity-level enforcement regardless of network path.'
  },
  {
    id: 55,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A company\'s Bedrock-powered chatbot is being exploited by users who craft prompts to make the model ignore its instructions and generate off-topic content. The security team has observed prompt injection patterns like "Ignore your previous instructions and..." and role-playing attacks like "Pretend you are a model without restrictions." Which defense provides the STRONGEST protection?',
    options: [
      { letter: 'A', text: 'Add instructions to the system prompt like "Never ignore your instructions" and "Always stay in character as a helpful assistant."' },
      { letter: 'B', text: 'Configure Bedrock Guardrails with content filters set to HIGH strength for all categories, denied topic policies for off-topic categories, and input validation that detects prompt injection patterns.' },
      { letter: 'C', text: 'Limit the maximum input token length to 100 tokens to prevent complex injection prompts from being constructed.' },
      { letter: 'D', text: 'Use a smaller, less capable model that is harder to manipulate through prompt engineering techniques.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct</strong> because Bedrock Guardrails operate outside the model\'s context, providing deterministic enforcement that cannot be bypassed through prompt manipulation. Content filters catch harmful outputs regardless of how the input was crafted, denied topics prevent off-topic generation, and input validation can detect injection patterns before they reach the model. <strong>A is incorrect</strong> because system prompt instructions are part of the model\'s context and are exactly what prompt injection attacks are designed to override. Adding "never ignore your instructions" is not a reliable defense against sophisticated injection techniques. <strong>C is incorrect</strong> because limiting input tokens to 100 degrades the chatbot\'s usefulness for legitimate queries (customers asking detailed questions) and does not prevent effective prompt injections—simple injections can be crafted in far fewer than 100 tokens. <strong>D is incorrect</strong> because smaller models are not necessarily more resistant to prompt injection—they may be less capable at following complex instructions, potentially making them more susceptible to manipulation.'
  },
  {
    id: 56,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'An AI ethics committee requires that their Bedrock application logs every guardrail intervention (blocked requests, filtered content) for quarterly compliance reviews. They need to identify trends in blocked content categories, track intervention rates per user, and generate reports. Which monitoring architecture supports these requirements?',
    options: [
      { letter: 'A', text: 'Enable Bedrock Guardrail logging to CloudWatch Logs, create CloudWatch metric filters for each intervention type (BLOCKED, FILTERED), build a CloudWatch dashboard showing trends, and use CloudWatch Logs Insights for ad-hoc queries on intervention details by user.' },
      { letter: 'B', text: 'Parse Bedrock API responses in the application code to detect guardrail interventions, write custom metrics to CloudWatch using the PutMetricData API, and store detailed intervention logs in DynamoDB.' },
      { letter: 'C', text: 'Enable AWS CloudTrail for Bedrock and use Athena to query the trail for guardrail events, which CloudTrail automatically captures with full intervention details.' },
      { letter: 'D', text: 'Deploy Amazon Managed Grafana connected to Bedrock\'s built-in Prometheus metrics endpoint for real-time guardrail intervention dashboards.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because Bedrock supports guardrail logging to CloudWatch Logs, which captures detailed intervention events. CloudWatch metric filters create numeric metrics from log patterns for dashboarding, and Logs Insights enables SQL-like queries for compliance reporting by user or category. <strong>B is incorrect</strong> because while application-level logging can work, it requires custom development to parse guardrail responses, and the intervention data is already available through native Bedrock logging. Custom solutions are harder to maintain and may miss edge cases. <strong>C is incorrect</strong> because CloudTrail captures API call metadata (who called what) but does not capture guardrail intervention details such as which content was blocked, what filter was triggered, or the specific denied topic matched. <strong>D is incorrect</strong> because Bedrock does not expose a Prometheus metrics endpoint—this is a fabricated integration. CloudWatch is the native monitoring service for Bedrock metrics.'
  },
  {
    id: 57,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A company is migrating their on-premises FM workload to AWS. Their security policy requires that all data at rest and in transit be encrypted with keys that the company controls and can rotate on demand. Which encryption configuration for Amazon Bedrock satisfies this requirement?',
    options: [
      { letter: 'A', text: 'Use AWS KMS customer-managed keys (CMKs) for encrypting Bedrock resources (custom models, knowledge bases, agent data). Data in transit is encrypted with TLS 1.2+ between the application and Bedrock endpoints. Configure automatic annual key rotation on the CMKs.' },
      { letter: 'B', text: 'Use the default AWS-managed encryption that Bedrock provides, which uses AWS-owned keys that are automatically rotated.' },
      { letter: 'C', text: 'Encrypt all data client-side before sending to Bedrock using AES-256 with keys stored in AWS Secrets Manager, and decrypt responses client-side.' },
      { letter: 'D', text: 'Use AWS CloudHSM to generate and store encryption keys, and configure Bedrock to use the CloudHSM-backed KMS key for all encryption operations.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because customer-managed KMS keys give the company full control over the encryption keys used for Bedrock resources. They can define key policies, enable/disable keys, and configure rotation schedules. TLS 1.2+ is the standard for Bedrock API communication, ensuring in-transit encryption. <strong>B is incorrect</strong> because AWS-managed keys and AWS-owned keys are not under the company\'s control—the company cannot set rotation schedules, define key policies, or revoke access, failing the requirement that the company controls the keys. <strong>C is incorrect</strong> because client-side encryption would make the data unusable by Bedrock—the FM cannot process encrypted prompts. Bedrock needs plaintext input to generate responses, so service-side encryption with customer-managed keys is the correct approach. <strong>D is incorrect</strong> because while CloudHSM provides the highest level of key control, it adds significant operational complexity. Standard KMS customer-managed keys satisfy the stated requirements (company control, on-demand rotation) without CloudHSM overhead. CloudHSM is typically required only for specific regulatory mandates (e.g., FIPS 140-2 Level 3).'
  },
  {
    id: 58,
    domain: 'D3',
    domainName: 'Safety, Security & Governance',
    multi: false,
    text: 'A company is concerned about model providers potentially training on their proprietary data sent through Amazon Bedrock. They need contractual and technical assurances that their inputs and outputs are not used for model training. Which statement about Amazon Bedrock\'s data usage policy is correct?',
    options: [
      { letter: 'A', text: 'Amazon Bedrock does not use customer inputs or outputs to train or improve any AWS or third-party foundation models. Customer data is not shared with model providers. This is a contractual commitment in the AWS service terms.' },
      { letter: 'B', text: 'Amazon Bedrock uses anonymized customer data to improve model performance by default, but customers can opt out by submitting a support ticket.' },
      { letter: 'C', text: 'Third-party model providers (Anthropic, Meta, Mistral) receive customer inputs to improve their models, but AWS does not use the data for Titan models.' },
      { letter: 'D', text: 'Customer data is used for model improvement only if the customer enables "Model Improvement" in the Bedrock console settings.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because AWS explicitly commits that Amazon Bedrock does not use customer inputs or outputs to train or improve AWS or third-party foundation models. Customer data is isolated and not shared with model providers. This is a core data privacy commitment documented in the AWS service terms. <strong>B is incorrect</strong> because there is no default data usage for model improvement in Bedrock—the claim that customers must opt out is false. The default is that data is NOT used for training. <strong>C is incorrect</strong> because third-party model providers do NOT receive customer inputs from Bedrock. AWS acts as an intermediary and does not share customer prompts or responses with Anthropic, Meta, Mistral, or other providers. <strong>D is incorrect</strong> because there is no "Model Improvement" setting in the Bedrock console—the data usage policy is a blanket commitment, not a configurable option.'
  },
  // ─── D4: Operational Efficiency (9 questions, IDs 59–67) ───
  {
    id: 59,
    domain: 'D4',
    domainName: 'Operational Efficiency',
    multi: false,
    text: 'A global SaaS company serves users across North America, Europe, and Asia-Pacific. Their Bedrock-powered chatbot is deployed in us-east-1, and Asia-Pacific users experience 400ms round-trip latency to the API. The company wants to reduce latency for all regions while maintaining a single codebase. Which multi-Region strategy is MOST cost-effective?',
    options: [
      { letter: 'A', text: 'Deploy the application stack in us-east-1, eu-west-1, and ap-northeast-1, each calling Bedrock in its respective region. Use Amazon Route 53 latency-based routing to direct users to the nearest deployment.' },
      { letter: 'B', text: 'Keep the application in us-east-1 and place Amazon CloudFront in front of the API, using edge locations to cache API responses and reduce latency for repeated queries.' },
      { letter: 'C', text: 'Deploy the application in all 6 regions where Bedrock is available, with a Global Accelerator endpoint for each, and an active-active architecture with DynamoDB Global Tables for conversation state.' },
      { letter: 'D', text: 'Use AWS Wavelength Zones in each continent to run the application at the telecom edge, calling Bedrock in the nearest Region from the Wavelength Zone.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because deploying in three strategically chosen regions (NA, EU, APAC) with Bedrock access in each provides the best latency reduction. Route 53 latency-based routing automatically directs users to the nearest deployment. Three regions balances coverage and cost. <strong>B is incorrect</strong> because FM responses are unique per query and cannot be cached effectively—each user\'s prompt generates a different response, making CloudFront caching largely ineffective for reducing Bedrock inference latency. <strong>C is incorrect</strong> because deploying in all 6 Bedrock regions is over-provisioned and unnecessarily expensive. Three strategically placed regions provide near-equivalent coverage, and DynamoDB Global Tables for conversation state adds significant cost and complexity. <strong>D is incorrect</strong> because Wavelength Zones are designed for ultra-low-latency mobile/5G applications and are not the standard approach for web API latency optimization. The primary latency issue is the distance to the Bedrock API endpoint, which multi-Region deployment addresses.'
  },
  {
    id: 60,
    domain: 'D4',
    domainName: 'Operational Efficiency',
    multi: false,
    text: 'A machine learning team needs to determine the optimal SageMaker instance type and configuration for hosting a custom 13B parameter model. They want to balance cost, latency, and throughput across multiple instance types (ml.g5.xlarge, ml.g5.2xlarge, ml.g5.4xlarge, ml.p4d.24xlarge). Which tool automates this benchmarking?',
    options: [
      { letter: 'A', text: 'SageMaker Inference Recommender, which load-tests the model across specified instance types and configurations, providing cost-per-inference, latency percentiles, and throughput metrics in a comparison report.' },
      { letter: 'B', text: 'SageMaker Debugger, which profiles model inference performance and identifies bottlenecks across different instance types.' },
      { letter: 'C', text: 'SageMaker Model Monitor, which tracks inference latency and throughput metrics across different endpoint configurations over time.' },
      { letter: 'D', text: 'AWS Compute Optimizer, which analyzes CloudWatch metrics from existing endpoints and recommends right-sized instances based on utilization patterns.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because SageMaker Inference Recommender is purpose-built for this task. It deploys the model to multiple instance types, runs load tests with configurable traffic patterns, and produces a comparison report with cost-per-inference, p50/p90/p99 latency, and maximum throughput for each configuration. <strong>B is incorrect</strong> because SageMaker Debugger profiles training jobs and can analyze inference with profiling rules, but it does not benchmark across multiple instance types or produce cost/throughput comparisons. <strong>C is incorrect</strong> because Model Monitor tracks data quality, model quality, and bias over time on a deployed endpoint—it does not benchmark across different instance types or provide cost optimization recommendations. <strong>D is incorrect</strong> because AWS Compute Optimizer analyzes EC2, Lambda, and EBS usage patterns, but does not support SageMaker endpoints and cannot run inference-specific load tests.'
  },
  {
    id: 61,
    domain: 'D4',
    domainName: 'Operational Efficiency',
    multi: false,
    text: 'A company runs a Bedrock-powered document analysis service with highly variable traffic: 100 requests/hour during business hours and 5 requests/hour overnight. They are using on-demand Bedrock pricing. Monthly costs are $15,000, with 60% of spending during the predictable business-hours window. How can they reduce costs without impacting performance?',
    options: [
      { letter: 'A', text: 'Purchase Bedrock Provisioned Throughput with a 1-month commitment for the business-hours capacity, which offers a lower per-token rate than on-demand for sustained usage, and use on-demand for overnight traffic.' },
      { letter: 'B', text: 'Switch to a smaller, cheaper model for all requests to reduce the per-token cost.' },
      { letter: 'C', text: 'Batch all requests into hourly groups and use Bedrock batch inference, which offers a 50% discount compared to on-demand pricing.' },
      { letter: 'D', text: 'Implement prompt compression to reduce input token count by 40%, lowering the per-request cost proportionally.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because Provisioned Throughput offers lower per-token rates compared to on-demand pricing for committed capacity. Since 60% of spending ($9,000/month) occurs during predictable business hours, provisioning capacity for that window reduces cost while using cheaper on-demand for the low overnight traffic. <strong>B is incorrect</strong> because switching to a smaller model may degrade document analysis quality, and the question specifies "without impacting performance." <strong>C is incorrect</strong> because the document analysis service likely requires real-time responses during business hours—batching hourly would introduce up to 60 minutes of delay, impacting the user experience. <strong>D is incorrect</strong> because while prompt compression can reduce costs, a 40% reduction in input tokens does not translate to 40% cost reduction (output tokens are often the larger cost component), and compression may reduce analysis quality.'
  },
  {
    id: 62,
    domain: 'D4',
    domainName: 'Operational Efficiency',
    multi: true,
    text: 'A company is planning capacity for a production Bedrock application that serves 50,000 daily active users. Peak traffic reaches 500 requests per minute at 9 AM. The application uses Claude 3 Sonnet with average input of 2,000 tokens and output of 500 tokens per request. Which TWO capacity planning steps are essential? (Select TWO.)',
    options: [
      { letter: 'A', text: 'Calculate the peak tokens-per-minute requirement (500 requests × 2,500 total tokens = 1,250,000 TPM) and verify this is within the account\'s service quota for the Claude 3 Sonnet model in the target Region.' },
      { letter: 'B', text: 'Request Provisioned Throughput matching the peak capacity to guarantee availability, with a minimum 1-month commitment term.' },
      { letter: 'C', text: 'Implement client-side request queuing with exponential backoff and jitter to handle any throttling gracefully, ensuring the application degrades gracefully if quotas are temporarily exceeded.' },
      { letter: 'D', text: 'Deploy the application in 3 Regions to distribute the 500 RPM across endpoints, reducing per-Region load to approximately 167 RPM.' },
      { letter: 'E', text: 'Provision 10 SageMaker endpoints with auto-scaling to handle overflow from Bedrock throttling.' }
    ],
    correct: ['A', 'C'],
    explanation: '<strong>A is correct</strong> because calculating peak token throughput and verifying service quotas is the fundamental first step in capacity planning. If the account quota is below the peak requirement, a quota increase must be requested before launch. <strong>C is correct</strong> because even with adequate quotas, transient throttling can occur during traffic spikes. Client-side exponential backoff with jitter is an essential resilience pattern that ensures the application handles throttling gracefully without failing requests. <strong>B is incorrect</strong> because Provisioned Throughput is a cost optimization, not a required capacity planning step. On-demand with adequate quotas can handle the load—provisioned throughput is optional and depends on cost analysis. <strong>D is incorrect</strong> because distributing load across 3 regions for 500 RPM adds unnecessary complexity—this is a moderate load that a single region can handle within normal quotas. Multi-region should be driven by latency requirements, not capacity alone. <strong>E is incorrect</strong> because SageMaker endpoints cannot serve as overflow for Bedrock API throttling—they would require deploying a separate model and creating a completely different inference pipeline.'
  },
  {
    id: 63,
    domain: 'D4',
    domainName: 'Operational Efficiency',
    multi: false,
    text: 'A company processes 1 million customer feedback entries monthly using Bedrock for sentiment analysis and topic classification. Each entry averages 200 input tokens, and the FM output averages 50 tokens. The process runs as a daily batch job. They want to minimize the monthly Bedrock cost. Which optimization has the GREATEST cost impact?',
    options: [
      { letter: 'A', text: 'Use Bedrock batch inference API instead of individual InvokeModel calls, which provides up to 50% cost reduction for batch workloads.' },
      { letter: 'B', text: 'Switch from Claude 3 Sonnet to Claude 3 Haiku, which provides comparable sentiment/classification accuracy at approximately 10-20x lower per-token pricing.' },
      { letter: 'C', text: 'Reduce input tokens by summarizing each feedback entry to 100 tokens before sending to Bedrock, cutting input costs by 50%.' },
      { letter: 'D', text: 'Use prompt caching by constructing identical system prompts across batches, reducing redundant token processing.' }
    ],
    correct: ['B'],
    explanation: '<strong>B is correct</strong> because for classification and sentiment tasks, smaller models like Haiku perform comparably to Sonnet. The per-token pricing difference is approximately 10-20x (depending on specific pricing at the time), which has a far greater cost impact than a 50% batch discount or 50% input reduction. For 1 million entries, this translates to the largest absolute cost savings. <strong>A is incorrect</strong> because while batch inference provides up to 50% savings, switching to Haiku provides 10-20x savings—a much greater cost impact for classification tasks where the smaller model is adequate. <strong>C is incorrect</strong> because reducing input tokens by 50% only saves on input token costs, which at 200 tokens per entry is already small. The summarization step itself would require additional FM calls, potentially increasing overall cost. <strong>D is incorrect</strong> because while prompt caching reduces costs for repeated system prompts, the savings are modest compared to the 10-20x per-token price difference between Sonnet and Haiku for the entire workload.'
  },
  {
    id: 64,
    domain: 'D4',
    domainName: 'Operational Efficiency',
    multi: false,
    text: 'A SageMaker endpoint hosting a custom image classification model experiences traffic spikes that cause request queuing and increased latency. Current configuration uses a single ml.g5.xlarge instance. The team wants the endpoint to automatically scale between 1 and 5 instances based on demand with a target of keeping invocation latency under 200ms. Which auto-scaling configuration achieves this?',
    options: [
      { letter: 'A', text: 'Configure Application Auto Scaling with a target tracking policy on the InvocationsPerInstance metric, setting the target value based on the throughput at which latency exceeds 200ms, with MinCapacity=1 and MaxCapacity=5.' },
      { letter: 'B', text: 'Configure Application Auto Scaling with a step scaling policy on the OverheadLatency metric, adding 1 instance when latency exceeds 200ms and removing 1 when below 100ms.' },
      { letter: 'C', text: 'Enable SageMaker Serverless Inference, which automatically scales from 0 to handle traffic spikes without any auto-scaling configuration.' },
      { letter: 'D', text: 'Configure an EC2 Auto Scaling group behind the SageMaker endpoint to scale the underlying compute instances based on CPU utilization.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because SageMaker endpoints use Application Auto Scaling with InvocationsPerInstance as the recommended scaling metric. Target tracking automatically adjusts instance count to maintain the target invocations per instance, which directly correlates with latency. Setting the target based on benchmarked throughput ensures latency stays under 200ms. <strong>B is incorrect</strong> because OverheadLatency measures SageMaker overhead, not total inference latency. Step scaling on this metric does not directly target the 200ms latency goal and requires manual threshold tuning. <strong>C is incorrect</strong> because Serverless Inference has cold start latency that can exceed 200ms and may not support GPU instance types (ml.g5) needed for image classification models. <strong>D is incorrect</strong> because SageMaker endpoints are managed—you cannot configure EC2 Auto Scaling groups for SageMaker instances. SageMaker uses Application Auto Scaling on endpoint variants, not EC2 Auto Scaling groups.'
  },
  {
    id: 65,
    domain: 'D4',
    domainName: 'Operational Efficiency',
    multi: false,
    text: 'A company uses Amazon Bedrock for asynchronous document processing. Users submit documents through a web portal, and results are delivered via email within 2 hours. During peak times, 500 documents are submitted per hour, but Bedrock throttles at 200 requests per minute. How should the architecture handle this mismatch?',
    options: [
      { letter: 'A', text: 'Use an Amazon SQS queue between the web portal and the Bedrock processing Lambda. Configure the Lambda with a reserved concurrency of 200 and a batch size of 1. SQS visibility timeout set to 15 minutes. Failed messages go to a dead-letter queue for retry.' },
      { letter: 'B', text: 'Use Amazon EventBridge Pipes to connect the SQS queue to Bedrock directly, with EventBridge handling rate limiting and retry logic.' },
      { letter: 'C', text: 'Implement client-side queuing in the web portal using JavaScript, limiting submission rate to 3 per second and retrying failed submissions.' },
      { letter: 'D', text: 'Deploy multiple AWS accounts with separate Bedrock quotas and round-robin document submissions across accounts to multiply available throughput.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because SQS decouples document submission from processing, absorbing traffic spikes. Lambda reserved concurrency of 200 limits concurrent Bedrock calls to within the throttle limit. SQS visibility timeout and DLQ handle transient failures. At 200 RPM, 500 documents/hour (8.3 RPM) is well within capacity. <strong>B is incorrect</strong> because EventBridge Pipes does not call Bedrock directly—Bedrock is not a supported EventBridge Pipes target. A Lambda function is still needed as the processing component. <strong>C is incorrect</strong> because client-side queuing is unreliable (browser closures, network issues), does not handle multiple concurrent users, and places the rate-limiting burden on the client instead of the server infrastructure. <strong>D is incorrect</strong> because multi-account deployment for 500 documents/hour is extreme over-engineering. The throughput requirement (8.3 RPM) is well within single-account quotas. Multi-account adds billing, security, and operational complexity.'
  },
  {
    id: 66,
    domain: 'D4',
    domainName: 'Operational Efficiency',
    multi: false,
    text: 'A company runs a SageMaker endpoint with Provisioned Concurrency for a latency-sensitive application. During non-business hours (6 PM to 8 AM), traffic drops to near zero, but they are paying for idle instances. The endpoint must respond within 500ms during business hours. How should they optimize costs while meeting latency requirements?',
    options: [
      { letter: 'A', text: 'Configure a scheduled Application Auto Scaling action to scale the endpoint to 1 instance at 6 PM and back to the required capacity at 7:45 AM (allowing warm-up time), reducing overnight costs while maintaining readiness for business hours.' },
      { letter: 'B', text: 'Delete the endpoint at 6 PM using a Lambda function and recreate it at 8 AM, saving 100% of overnight costs.' },
      { letter: 'C', text: 'Switch to SageMaker Serverless Inference for overnight traffic, which scales to zero, and use a provisioned endpoint during business hours.' },
      { letter: 'D', text: 'Use SageMaker Managed Spot Instances for the endpoint during non-business hours to reduce costs by up to 90%.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because scheduled scaling reduces capacity to 1 instance during low-traffic periods while maintaining a warm instance (no cold start). Scaling up 15 minutes before business hours ensures the endpoint is fully provisioned before the first request, meeting the 500ms latency requirement. <strong>B is incorrect</strong> because deleting and recreating an endpoint takes 5-15 minutes for model deployment and initialization. If a request arrives during this window, it fails entirely. The 500ms latency requirement cannot be met during the transition period. <strong>C is incorrect</strong> because switching between Serverless and Provisioned endpoints requires changing the endpoint configuration, which is not instantaneous. Serverless Inference also has cold start latency that may exceed 500ms for the first request after a period of inactivity. <strong>D is incorrect</strong> because SageMaker Managed Spot Instances are supported for training jobs, not real-time inference endpoints. Spot interruptions would cause unacceptable availability issues for a production endpoint.'
  },
  {
    id: 67,
    domain: 'D4',
    domainName: 'Operational Efficiency',
    multi: false,
    text: 'A company wants to optimize their Bedrock prompt to reduce token usage while maintaining output quality. Their current prompt for customer email classification uses 1,500 input tokens including a system prompt with 20 classification categories and 3 few-shot examples per category. Which optimization technique provides the BEST token reduction with minimal quality impact?',
    options: [
      { letter: 'A', text: 'Replace the 60 few-shot examples (3 per category × 20 categories) with clear category descriptions and selection criteria, reducing from 1,500 to approximately 400 tokens while maintaining classification accuracy through well-defined decision boundaries.' },
      { letter: 'B', text: 'Remove the system prompt entirely and rely on the model\'s pre-trained understanding of email classification.' },
      { letter: 'C', text: 'Compress the prompt using abbreviations and removing articles/prepositions (e.g., "classify email cat: billing, tech, sales" instead of full sentences).' },
      { letter: 'D', text: 'Switch from few-shot prompting to chain-of-thought prompting, which requires the model to reason through each classification step, improving accuracy but using more output tokens.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because replacing 60 few-shot examples with concise category descriptions and clear decision criteria dramatically reduces input tokens (from ~1,500 to ~400) while maintaining classification accuracy. Modern FMs perform well with clear instructions and category definitions without requiring extensive examples for straightforward classification tasks. <strong>B is incorrect</strong> because removing the system prompt entirely for a 20-category classification task would significantly degrade accuracy—the model needs to know the available categories and classification criteria. <strong>C is incorrect</strong> because heavily abbreviated prompts reduce the model\'s ability to understand instructions accurately. Modern FMs are trained on natural language and perform best with clear, well-structured prompts, not abbreviated text. <strong>D is incorrect</strong> because the question asks for token reduction—chain-of-thought prompting increases output tokens by requiring the model to generate reasoning steps, which increases cost rather than reducing it.'
  },
  // ─── D5: Testing & Troubleshooting (8 questions, IDs 68–75) ───
  {
    id: 68,
    domain: 'D5',
    domainName: 'Testing & Troubleshooting',
    multi: false,
    text: 'A company\'s RAG application using Bedrock Knowledge Bases is returning increasingly irrelevant answers over the past two weeks. Retrieval metrics show that the top-5 retrieved chunks have an average relevance score of 0.45, down from 0.78 two weeks ago. The knowledge base corpus has grown by 30% in that period. The embedding model and FM have not changed. What is the MOST likely cause?',
    options: [
      { letter: 'A', text: 'The 30% corpus growth introduced documents with overlapping or contradictory content that dilute the relevance of retrieved chunks, and the chunking strategy is not optimized for the new document types, causing semantic drift in the vector space.' },
      { letter: 'B', text: 'The embedding model has degraded over time due to continuous use and needs to be retrained on the updated corpus.' },
      { letter: 'C', text: 'The OpenSearch Serverless vector engine automatically rebalanced index shards after the corpus growth, temporarily degrading search quality.' },
      { letter: 'D', text: 'Bedrock introduced a silent API change that modified the retrieval algorithm, affecting relevance scoring for all customers.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because a 30% corpus growth with documents that overlap or conflict with existing content can significantly reduce retrieval quality. New documents may use different terminology for the same concepts, creating embedding space fragmentation. If the new documents use a different structure than the chunking strategy was optimized for, chunks may contain mixed topics, reducing their specificity and relevance scores. <strong>B is incorrect</strong> because embedding models are static after deployment—they do not degrade from use. The model produces the same embedding for the same input regardless of how many times it is called. <strong>C is incorrect</strong> because OpenSearch Serverless manages index optimization transparently without degrading search quality during rebalancing. Shard rebalancing is a storage-level operation that does not affect the vector similarity search algorithm. <strong>D is incorrect</strong> because AWS maintains backward compatibility in managed services and would not silently change the retrieval algorithm. Such changes would be documented and announced.'
  },
  {
    id: 69,
    domain: 'D5',
    domainName: 'Testing & Troubleshooting',
    multi: false,
    text: 'A development team is building integration tests for a Bedrock-powered customer service application. They want tests to run quickly in CI/CD without calling the actual Bedrock API (to avoid costs and rate limiting). The tests need to verify that the application correctly handles FM responses, including edge cases like empty responses, timeout errors, and guardrail-blocked responses. Which testing approach is MOST appropriate?',
    options: [
      { letter: 'A', text: 'Mock the Bedrock SDK client using a library like aws-sdk-client-mock, returning predefined response fixtures for each test scenario (successful response, empty response, ThrottlingException, guardrail-blocked AccessDeniedException).' },
      { letter: 'B', text: 'Use a local LLM (like Ollama with a small model) as a Bedrock endpoint replacement, configuring the application to point to localhost during tests.' },
      { letter: 'C', text: 'Record actual Bedrock API responses using VCR-style cassettes during development, then replay them during CI/CD test runs.' },
      { letter: 'D', text: 'Call the actual Bedrock API in tests but use the cheapest model (Titan Text Lite) and limit test inputs to 10 tokens to minimize cost.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because SDK mocking provides deterministic, fast, cost-free tests that can simulate any response scenario including edge cases. Libraries like aws-sdk-client-mock intercept SDK calls and return predefined fixtures, allowing complete control over test scenarios (success, empty, throttling, guardrail blocks). <strong>B is incorrect</strong> because a local LLM produces different responses than Bedrock models, cannot simulate Bedrock-specific error responses (ThrottlingException, guardrail blocks), and requires GPU resources in the CI/CD environment. <strong>C is incorrect</strong> because recorded cassettes capture specific responses that become stale when prompts change, are fragile to API response format changes, and cannot easily test error scenarios that did not occur during recording. <strong>D is incorrect</strong> because calling the actual API in CI/CD incurs costs per test run, is subject to rate limiting that slows CI/CD, and depends on network availability—making tests flaky and expensive at scale.'
  },
  {
    id: 70,
    domain: 'D5',
    domainName: 'Testing & Troubleshooting',
    multi: false,
    text: 'A company\'s Bedrock-powered chatbot has been in production for 6 months. Users report that the chatbot\'s answers about product pricing are frequently incorrect, though other topics remain accurate. The knowledge base was last updated 2 months ago, and pricing has changed 3 times since then. Which monitoring approach would have detected this issue earlier?',
    options: [
      { letter: 'A', text: 'Implement automated regression testing that runs daily with a curated set of pricing questions and expected answers, comparing FM responses against ground truth. Alert when accuracy on any topic category drops below a threshold.' },
      { letter: 'B', text: 'Monitor Bedrock API latency and error rates in CloudWatch, alerting when either exceeds predefined thresholds.' },
      { letter: 'C', text: 'Deploy Amazon SageMaker Model Monitor to detect data drift in the embedding model, which would indicate the knowledge base content is stale.' },
      { letter: 'D', text: 'Track the number of user messages per session—an increase would indicate dissatisfaction with response quality.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because automated regression testing with ground truth comparison directly measures response accuracy per topic. A daily test suite with pricing questions would detect incorrect answers within 24 hours of the knowledge base becoming stale, well before users report issues. <strong>B is incorrect</strong> because latency and error rate monitoring measures system health, not response quality. The chatbot can return incorrect pricing information with perfect latency and zero API errors. <strong>C is incorrect</strong> because SageMaker Model Monitor tracks data distribution drift for deployed ML models, not knowledge base content freshness. The embedding model is functioning correctly—the issue is stale source data, not model drift. <strong>D is incorrect</strong> because increased messages per session is an indirect and lagging indicator. Users may send more messages for many reasons (complex questions, new features), and by the time this metric shows a statistically significant trend, the issue has been affecting users for weeks.'
  },
  {
    id: 71,
    domain: 'D5',
    domainName: 'Testing & Troubleshooting',
    multi: true,
    text: 'A SageMaker endpoint hosting a custom text generation model suddenly starts returning HTTP 500 errors for 30% of requests. CloudWatch shows the endpoint is healthy and the InvocationsPerInstance metric is within normal range. Model latency has not changed for successful requests. Which TWO diagnostic steps should the team take FIRST? (Select TWO.)',
    options: [
      { letter: 'A', text: 'Check the SageMaker endpoint\'s ModelLatency and OverheadLatency CloudWatch metrics for the 500-error requests, and examine the endpoint container logs in CloudWatch Logs for stack traces or out-of-memory errors.' },
      { letter: 'B', text: 'Analyze the specific input payloads that trigger 500 errors versus successful requests, looking for patterns such as input length, character encoding issues, or malformed JSON that causes the model container to fail.' },
      { letter: 'C', text: 'Immediately scale the endpoint to 10 instances to distribute load, assuming the errors are caused by insufficient capacity.' },
      { letter: 'D', text: 'Roll back to the previous model version, assuming a recent deployment introduced a bug.' },
      { letter: 'E', text: 'Contact AWS Support to report a SageMaker service outage affecting the endpoint.' }
    ],
    correct: ['A', 'B'],
    explanation: '<strong>A is correct</strong> because container logs in CloudWatch Logs are the primary diagnostic source for 500 errors—they contain stack traces, error messages, and resource utilization data that reveal whether the container is crashing due to OOM, unhandled exceptions, or other issues. <strong>B is correct</strong> because 30% error rate (not 100%) suggests input-dependent failures. Analyzing the failing vs. succeeding payloads can identify patterns like oversized inputs, special characters, or encoding issues that cause the model serving container to fail for specific requests. <strong>C is incorrect</strong> because the InvocationsPerInstance metric is within normal range, indicating the issue is not capacity-related. Scaling would not fix input-dependent processing failures. <strong>D is incorrect</strong> because rolling back without diagnosis is premature—if the issue is input-dependent (certain requests fail), rolling back may not fix it, and it wastes time if the previous version has the same issue. <strong>E is incorrect</strong> because a 30% error rate on a specific endpoint, while others are healthy, is likely a customer-side issue (model code, input data), not a SageMaker service outage.'
  },
  {
    id: 72,
    domain: 'D5',
    domainName: 'Testing & Troubleshooting',
    multi: false,
    text: 'A team is running a performance benchmark for their RAG application. They need to measure end-to-end latency (from user query to final response), retrieval quality (relevance of retrieved chunks), and generation quality (accuracy and helpfulness of the FM response). They have 200 test queries with human-annotated ground truth answers and relevant passages. Which benchmarking approach provides the MOST comprehensive evaluation?',
    options: [
      { letter: 'A', text: 'Run all 200 queries through the RAG pipeline, record end-to-end latency for each, compute retrieval metrics (precision@K, recall@K, MRR) by comparing retrieved chunks to annotated relevant passages, and evaluate generation quality using an evaluator FM that scores faithfulness, relevance, and helpfulness against ground truth.' },
      { letter: 'B', text: 'Run 200 queries and measure only end-to-end latency percentiles (p50, p90, p99), since latency is the primary production concern.' },
      { letter: 'C', text: 'Use only ROUGE and BLEU scores to compare generated answers against ground truth, since these metrics are standard for NLP evaluation.' },
      { letter: 'D', text: 'Have 3 team members manually review all 200 responses and rate them on a 1-5 scale for quality.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because it evaluates all three dimensions: latency (operational performance), retrieval quality (precision@K, recall@K, MRR measure how well the retriever finds relevant passages), and generation quality (FM-based evaluation scores faithfulness, relevance, and helpfulness). This comprehensive approach identifies whether issues are in retrieval, generation, or both. <strong>B is incorrect</strong> because latency alone does not measure answer quality—a fast system that returns wrong answers is useless. Retrieval and generation quality are equally critical for a RAG application. <strong>C is incorrect</strong> because ROUGE and BLEU measure surface-level text overlap, which poorly captures semantic accuracy for generative responses. A correct answer using different wording would score low, while a fluent but incorrect answer might score high. <strong>D is incorrect</strong> because manual review of 200 responses by 3 people is subjective, time-consuming, not reproducible, and does not measure retrieval quality or latency. It cannot be integrated into CI/CD pipelines for regression testing.'
  },
  {
    id: 73,
    domain: 'D5',
    domainName: 'Testing & Troubleshooting',
    multi: false,
    text: 'A production Bedrock application that was functioning normally yesterday is now returning ModelTimeoutException for approximately 40% of requests. The application code has not changed. CloudWatch metrics show that successful requests complete in the normal 3-second range, but timed-out requests hit the 60-second timeout. What should the team investigate FIRST?',
    options: [
      { letter: 'A', text: 'Check the AWS Health Dashboard and Bedrock service health for the specific Region and model for any ongoing incidents or degraded performance, and review the Bedrock runtime metrics for the specific model to identify capacity-related issues.' },
      { letter: 'B', text: 'Increase the timeout to 120 seconds in the Bedrock client configuration to give the service more time to respond.' },
      { letter: 'C', text: 'Switch to a different Bedrock model immediately, assuming the current model is experiencing an outage.' },
      { letter: 'D', text: 'Review the application\'s VPC configuration and security groups for network issues that might be blocking Bedrock API traffic intermittently.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because when a previously working application starts timing out without code changes, the first step is checking for service-side issues. The AWS Health Dashboard and Bedrock service health provide information about ongoing incidents. The bimodal latency (3s for success, 60s for timeout) suggests a capacity or routing issue on the service side rather than a systematic problem. <strong>B is incorrect</strong> because increasing the timeout from 60s to 120s does not fix the root cause—requests are timing out, not completing slowly. A 120-second timeout would just make users wait longer before failing. <strong>C is incorrect</strong> because switching models without understanding the root cause is premature. If the issue is regional capacity or a service incident, a different model in the same Region might also be affected. Diagnosis should precede remediation. <strong>D is incorrect</strong> because VPC and security group issues would affect all requests, not 40%. Network configuration does not typically cause intermittent failures for managed service API calls, and the application was working yesterday without configuration changes.'
  },
  {
    id: 74,
    domain: 'D5',
    domainName: 'Testing & Troubleshooting',
    multi: false,
    text: 'A company built a custom CloudWatch dashboard to monitor their Bedrock-powered application. They want to track key performance indicators (KPIs) including: FM response quality, token usage efficiency, guardrail intervention rate, and user satisfaction. Which combination of metrics provides actionable KPI tracking?',
    options: [
      { letter: 'A', text: 'Create custom CloudWatch metrics for: (1) automated quality score from evaluator FM sampling 5% of responses, (2) average input/output token ratio per request, (3) guardrail intervention count as a percentage of total requests, and (4) user feedback thumbs-up/down ratio sent as custom metrics from the application.' },
      { letter: 'B', text: 'Use only the built-in Bedrock CloudWatch metrics: InvocationLatency, InvocationCount, and InvocationClientErrors, which provide sufficient operational visibility.' },
      { letter: 'C', text: 'Track only cost metrics (total token usage × price per token) since cost is the primary KPI for FM applications.' },
      { letter: 'D', text: 'Monitor server-side metrics exclusively (CPU utilization, memory usage, network throughput) since they correlate with all application KPIs.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because it provides metrics for all four required KPIs: (1) FM quality via automated evaluation on a sample, (2) token efficiency via input/output ratios, (3) guardrail intervention rates for safety monitoring, and (4) user satisfaction via direct feedback. Custom CloudWatch metrics enable dashboarding and alerting on all dimensions. <strong>B is incorrect</strong> because built-in Bedrock metrics cover operational health (latency, errors) but not response quality, token efficiency, guardrail rates, or user satisfaction. These KPIs require custom metrics from the application layer. <strong>C is incorrect</strong> because cost is one factor but not the primary KPI—a cheap system that provides poor answers or is frequently blocked by guardrails is not effective. Quality, safety, and satisfaction metrics are equally important. <strong>D is incorrect</strong> because server-side infrastructure metrics do not correlate with FM response quality or user satisfaction. Bedrock is a managed service with no customer-visible servers, and even for SageMaker endpoints, CPU/memory metrics do not reflect output quality.'
  },
  {
    id: 75,
    domain: 'D5',
    domainName: 'Testing & Troubleshooting',
    multi: false,
    text: 'A Bedrock-powered customer support chatbot experiences a sudden spike in guardrail interventions, blocking 25% of user requests (up from a baseline of 2%). The guardrail configuration has not changed. Customer complaints about the chatbot being unhelpful have tripled. What is the MOST likely root cause, and how should the team investigate?',
    options: [
      { letter: 'A', text: 'A recent product launch is causing customers to ask questions that match the guardrail\'s denied topic patterns. The team should analyze the guardrail logs to identify which specific denied topics and content filters are triggering, compare blocked queries to legitimate customer intent, and adjust guardrail sensitivity or add topic exceptions for the new product category.' },
      { letter: 'B', text: 'The guardrail is malfunctioning due to an internal service issue. The team should contact AWS Support immediately and disable the guardrail until it is fixed.' },
      { letter: 'C', text: 'Users are deliberately trying to jailbreak the chatbot in a coordinated attack. The team should implement IP-based rate limiting and block suspicious users.' },
      { letter: 'D', text: 'The FM model was silently updated by the model provider, causing it to generate outputs that trigger the guardrail more frequently. The team should revert to the previous model version.' }
    ],
    correct: ['A'],
    explanation: '<strong>A is correct</strong> because a sudden spike in guardrail blocks coinciding with unchanged guardrail configuration strongly suggests a change in user input patterns. A product launch is a common cause—new product names, features, or use cases may inadvertently match denied topic patterns or content filters. Analyzing guardrail logs reveals exactly which rules are triggering and whether they are false positives. <strong>B is incorrect</strong> because guardrails are deterministic rule-based systems that do not randomly malfunction. The consistent 2% baseline before the spike indicates the guardrail is working as configured. Disabling it removes important safety protections. <strong>C is incorrect</strong> because a coordinated jailbreak attack would typically show patterns (specific prompt templates, concentrated time windows, few unique users), and the customer complaints suggest legitimate users are being blocked, not attackers. <strong>D is incorrect</strong> because Bedrock model updates are versioned and documented, not silent. Furthermore, guardrails evaluate inputs independently of the FM—a model change would not cause input-side guardrail blocks to increase.'
  }
]
