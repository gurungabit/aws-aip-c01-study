# Domain 1: Foundation Model Integration, Data Management & Compliance (31%)

> This is the HEAVIEST domain. Master this first.

---

## Task 1.1: Analyze Requirements & Design GenAI Solutions

### Key Concepts
- Create architectural designs aligned with **business needs + technical constraints**
- Select appropriate Foundation Models (FMs)
- Build proof-of-concept implementations to validate feasibility
- Use **AWS Well-Architected Framework** and the **Generative AI Lens**

### Services to Know
| Service | Why |
|---------|-----|
| Amazon Bedrock | Primary FM access platform |
| AWS Well-Architected Tool | Assess architecture against best practices |

---

## Task 1.2: Select and Configure FMs

### FM Selection Criteria
- Performance benchmarking (accuracy, latency, throughput)
- Capability analysis (what the model can/can't do)
- Cost-performance ratio
- Limitation evaluation

### Architecture Patterns for Model Flexibility
- **Dynamic model selection** - switch providers without code changes
- Services: AWS Lambda, Amazon API Gateway, AWS AppConfig
- Use **abstraction layers** so you can swap models

### Resilience Patterns
- **Circuit breaker** pattern via AWS Step Functions
- **Cross-Region Inference** in Amazon Bedrock
- Cross-Region model deployment
- Graceful degradation strategies

### FM Customization
| Technique | Service | When to Use |
|-----------|---------|-------------|
| Fine-tuning | SageMaker AI | Domain-specific adaptation |
| LoRA (Low-Rank Adaptation) | SageMaker AI | Parameter-efficient fine-tuning |
| Adapters | SageMaker AI | Lightweight customization |
| Model Registry | SageMaker Model Registry | Version management |
| Prompt engineering | Bedrock Prompt Management | No training needed |

### Deployment Lifecycle
- Automated deployment pipelines
- Rollback strategies for failed deployments
- Lifecycle management for model retirement/replacement

---

## Task 1.3: Data Validation & Processing Pipelines

### Data Quality
| Service | Purpose |
|---------|---------|
| AWS Glue Data Quality | Automated data quality rules |
| SageMaker Data Wrangler | Data preparation & transformation |
| Lambda functions | Custom validation logic |
| CloudWatch metrics | Monitor data quality over time |

### Multi-Modal Data Processing
- **Text**: Direct FM input formatting
- **Image**: Amazon Bedrock multimodal models
- **Audio**: AWS Transcribe -> text -> FM
- **Tabular**: SageMaker Processing for structured data

### Input Formatting
- JSON formatting for Bedrock API requests
- Structured data prep for SageMaker endpoints
- Conversation formatting for dialog apps (roles: system, user, assistant)

### Data Quality Enhancement
- Amazon Bedrock text reformatting
- Amazon Comprehend entity extraction
- Lambda functions for data normalization

---

## Task 1.4: Vector Store Solutions

### Vector Database Options on AWS

| Service | Key Feature |
|---------|-------------|
| **Amazon OpenSearch Service** | Neural plugin, hybrid search, sharding |
| **Amazon Aurora** | pgvector extension for PostgreSQL |
| **Amazon OpenSearch Serverless** | Managed, auto-scaling vector search |
| **Amazon Neptune Analytics** | GraphRAG with embeddings |
| **Amazon DynamoDB** | Metadata + embedding storage |
| **Amazon RDS** | pgvector extension |
| **Bedrock Knowledge Bases** | Managed vector store (zero config) |

### Metadata Frameworks
- S3 object metadata for timestamps
- Custom attributes for authorship
- Tagging systems for domain classification
- Improves search precision and context awareness

### Performance Optimization
- OpenSearch **sharding strategies**
- **Multi-index** approaches for specialized domains
- **Hierarchical indexing** techniques

### Data Maintenance
- Incremental update mechanisms
- Real-time change detection
- Automated sync workflows
- Scheduled refresh pipelines

---

## Task 1.5: Retrieval Mechanisms (RAG)

### Document Chunking Strategies

| Strategy | Description | When to Use |
|----------|-------------|-------------|
| **Fixed-size** | Consistent token/character chunks | Simple documents |
| **Semantic** | Chunks by meaning boundaries | Complex, varied content |
| **Hierarchical** | Parent-child chunk relationships | Long documents with structure |
| **Custom Lambda** | Your own chunking logic | Special requirements |

### Embedding Models

| Model | Notes |
|-------|-------|
| Amazon Titan Embeddings | AWS native, evaluate dimensionality |
| Bedrock embedding models | Multiple providers available |
| Lambda batch embedding | High-volume generation |

### Vector Search Deployment

| Service | Feature |
|---------|---------|
| OpenSearch Service | Vector search with Neural plugin |
| Aurora + pgvector | SQL-compatible vector search |
| Bedrock Knowledge Bases | Fully managed vector store |

### Advanced Search Techniques
- **Hybrid search**: Combine keyword + vector (semantic) search
- **Reranking**: Bedrock reranker models improve relevance
- **Query expansion**: Bedrock expands queries for better recall
- **Query decomposition**: Lambda breaks complex queries into sub-queries

### Access Patterns
- **Function calling** interfaces for vector search
- **Model Context Protocol (MCP)** clients for vector queries
- Standardized API patterns for retrieval augmentation

---

## Task 1.6: Prompt Engineering & Governance

### Prompt Management
| Service | Capability |
|---------|------------|
| Bedrock Prompt Management | Parameterized templates, versioning, approval workflows |
| Bedrock Guardrails | Responsible AI enforcement |
| S3 | Template repositories |
| CloudTrail | Usage tracking / audit |
| CloudWatch Logs | Access logging |

### Prompt Techniques
- **Role definitions** - system prompts that control behavior
- **Chain-of-thought** - step-by-step reasoning instructions
- **Structured input/output** - format specifications
- **Few-shot examples** - in-context learning
- **Feedback loops** - iterative refinement

### Prompt Flows (Orchestration)
- **Bedrock Prompt Flows** - sequential chains
- Conditional branching based on model responses
- Reusable prompt components
- Integrated pre/post-processing steps

### Interactive AI Systems
| Service | Purpose |
|---------|---------|
| Step Functions | Clarification workflows |
| Comprehend | Intent recognition |
| DynamoDB | Conversation history storage |

### Quality Assurance
- Lambda functions for output verification
- Step Functions for edge case testing
- CloudWatch for prompt regression testing

---

## Key Takeaways for Domain 1

1. **Amazon Bedrock is THE core service** - know it inside and out
2. **RAG pattern is critical**: chunking -> embedding -> vector store -> retrieval -> augmented prompt -> FM
3. **Vector stores**: Know OpenSearch, Aurora/pgvector, and Bedrock Knowledge Bases
4. **Prompt engineering**: Templates, versioning, governance, chain-of-thought
5. **Model flexibility**: Abstract FM selection, circuit breakers, cross-region inference
6. **Data quality**: Glue Data Quality, SageMaker Data Wrangler, custom Lambda validation
