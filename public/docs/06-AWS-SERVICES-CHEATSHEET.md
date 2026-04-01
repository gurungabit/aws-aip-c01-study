# AWS Services Cheat Sheet for AIP-C01

> Quick reference for all 90+ in-scope services organized by exam relevance.

---

## TIER 1: MUST KNOW (Will appear in many questions)

### Amazon Bedrock (THE Core Service)
| Feature | Purpose |
|---------|---------|
| **Model Access** | 100+ FMs from Amazon, Anthropic, Meta, Cohere, etc. |
| **Knowledge Bases** | Managed RAG - vector store, chunking, retrieval |
| **Guardrails** | 6 safety policies (content, PII, grounding, etc.) |
| **Agents** | Guided agent building |
| **AgentCore** | Deploy agents at scale, any framework |
| **Prompt Management** | Template versioning, parameterization, governance |
| **Prompt Flows** | Visual workflow builder for prompt chains |
| **Model Evaluation** | Built-in model assessment tools |
| **Data Automation** | Automated data processing for AI workflows |
| **Cross-Region Inference** | Resilience across regions |
| **Provisioned Throughput** | Reserved capacity for predictable workloads |
| **Streaming APIs** | Real-time response streaming |
| **Invoke API** | Standard model invocation |
| **Converse API** | Multi-turn conversation API |
| **Responses API** | OpenAI-compatible endpoint |
| **ApplyGuardrail API** | Apply guardrails to any model |
| **Amazon Titan** | Amazon's own FM family (text, embeddings, image) |

### Amazon SageMaker AI
| Feature | Purpose |
|---------|---------|
| **SageMaker AI Endpoints** | Host custom/fine-tuned models |
| **Model Registry** | Version and manage models |
| **Model Cards** | Document model capabilities/limitations |
| **Model Monitor** | Production model monitoring |
| **Clarify** | Bias detection and explainability |
| **Data Wrangler** | Data preparation and transformation |
| **Ground Truth** | Data labeling |
| **JumpStart** | Pre-trained model hub |
| **Processing** | Data processing jobs |
| **Neo** | Model optimization for deployment |
| **Unified Studio** | Integrated development environment |

### AWS Lambda
- Serverless compute for EVERYTHING: data processing, custom validation, chunking, embeddings, MCP servers, post-processing, tool execution
- Most mentioned compute service in the exam guide

### AWS Step Functions
- Orchestration engine: agent workflows, circuit breakers, ReAct patterns, A/B testing, human-in-the-loop, prompt chains
- **256 KB payload limit** per state — use S3 for large data, pass S3 URI between states
- Direct Bedrock integration (bedrock:invokeModel as Task state — no Lambda needed)

### Strands Agents & AWS Agent Squad
- **Strands Agents**: AWS-native agent framework for autonomous AI agents
- **AWS Agent Squad**: Multi-agent orchestration for coordinating specialized agents
- **MCP (Model Context Protocol)**: Standardized protocol for FM-tool interactions (Lambda = stateless, ECS = stateful)

### Amazon Bedrock Data Automation
- Automated data processing for AI workflows (ETL for GenAI)

---

## TIER 2: IMPORTANT (Frequently tested)

### AI/ML Services
| Service | Exam Relevance |
|---------|---------------|
| **Amazon Comprehend** | PII detection, entity extraction, intent recognition |
| **Amazon Q Developer** | AI code assistant, debugging, refactoring |
| **Amazon Q Business** | Enterprise knowledge assistant |
| **Amazon Kendra** | Intelligent search (alternative to OpenSearch) |
| **Amazon Lex** | Conversational interfaces (chatbots) |
| **Amazon Transcribe** | Speech-to-text (audio processing pipeline) |
| **Amazon Textract** | Document text/table extraction |
| **Amazon Rekognition** | Image/video analysis |
| **Amazon Augmented AI (A2I)** | Human review workflows |

### Data & Analytics
| Service | Exam Relevance |
|---------|---------------|
| **Amazon OpenSearch Service** | Vector database, neural search, hybrid search |
| **Amazon Aurora** | pgvector extension for vector search |
| **Amazon DynamoDB** | Metadata, conversation history, state |
| **AWS Glue** | Data quality, ETL, data lineage, Data Catalog |
| **Amazon S3** | Document storage, data lake, metadata |

### Networking & APIs
| Service | Exam Relevance |
|---------|---------------|
| **Amazon API Gateway** | API management, rate limiting, routing |
| **Amazon EventBridge** | Event-driven architecture |
| **Amazon CloudFront** | Edge caching for AI responses |
| **AWS PrivateLink** | Private connectivity to Bedrock |

### Monitoring & Governance
| Service | Exam Relevance |
|---------|---------------|
| **Amazon CloudWatch** | Metrics, logs, alarms, dashboards |
| **AWS X-Ray** | Distributed tracing |
| **AWS CloudTrail** | API audit logging |
| **AWS Cost Explorer** | Cost analysis |
| **AWS Cost Anomaly Detection** | Unexpected spend alerts |

### Security, Identity & Compliance
| Service | Exam Relevance |
|---------|---------------|
| **IAM** | Access control for everything |
| **IAM Identity Center** | Centralized SSO, multi-account access management |
| **IAM Access Analyzer** | Find overly permissive policies, external access |
| **Amazon Cognito** | User authentication/authorization for GenAI apps |
| **AWS KMS** | Encryption key management (at rest) |
| **AWS Encryption SDK** | Client-side encryption before data reaches AWS |
| **Amazon Macie** | PII detection in S3 |
| **AWS Secrets Manager** | API key/credential management |
| **AWS WAF** | Web application firewall, rate limiting GenAI APIs |

---

## TIER 3: KNOW THE BASICS (May appear in 1-2 questions)

### Compute & Containers
| Service | Quick Note |
|---------|-----------|
| Amazon EC2 | GPU instances for model hosting |
| Amazon ECS | Container orchestration (MCP servers) |
| Amazon EKS | Kubernetes for complex deployments |
| AWS Fargate | Serverless containers |
| AWS App Runner | Simple container deployment |

### Developer Tools
| Service | Quick Note |
|---------|-----------|
| AWS Amplify | Frontend for AI apps |
| AWS CDK / CloudFormation | Infrastructure as Code |
| AWS CodePipeline | CI/CD orchestration |
| AWS CodeBuild | Build and test |
| AWS CodeDeploy | Deployment automation |

### Application Integration
| Service | Quick Note |
|---------|-----------|
| Amazon SQS | Message queuing (async FM requests) |
| Amazon SNS | Notifications |
| Amazon AppFlow | SaaS data integration |
| AWS AppConfig | Dynamic configuration |
| AWS AppSync | GraphQL API service |

### Database (Other)
| Service | Quick Note |
|---------|-----------|
| Amazon ElastiCache | In-memory caching (also supports vector search) |
| **Amazon MemoryDB** | **Redis-compatible, fastest vector search on AWS, single-digit ms latency, multi-AZ durable** |
| Amazon Neptune | Graph database (GraphRAG) |
| Amazon DocumentDB | Document database |
| Amazon RDS | Relational database (pgvector) |

### Storage & Migration
| Service | Quick Note |
|---------|-----------|
| Amazon EBS/EFS | Block/file storage for model artifacts |
| S3 Intelligent-Tiering | Cost-optimize stored data |
| S3 Lifecycle policies | Data retention automation |
| AWS DataSync | Data transfer |

### Management & Governance
| Service | Quick Note |
|---------|-----------|
| Amazon Managed Grafana | Dashboards |
| AWS Auto Scaling | Resource scaling |
| AWS Systems Manager | Operations management |
| AWS Service Catalog | Approved service templates |
| AWS Well-Architected Tool | Architecture review |
| **AWS Lake Formation** | **Fine-grained data access (row/column level), LF-Tags, cross-account data governance** |
| **AWS Control Tower** | **Multi-account governance, SCPs, preventive/detective guardrails** |
| **CloudWatch Synthetics** | **Automated canary tests for GenAI API health monitoring** |

### Other
| Service | Quick Note |
|---------|-----------|
| Amazon Connect | AI-powered contact center |
| AWS Chatbot | ChatOps for AWS |
| Amazon Kinesis | Real-time data streaming |
| Amazon MSK | Managed Kafka |
| Amazon Athena | S3 data querying |
| Amazon EMR | Big data processing |
| Amazon QuickSight | Business intelligence |
| AWS Outposts | On-premises AWS |
| AWS Wavelength | Edge computing |

---

## OUT OF SCOPE (Don't study these)

Amazon Redshift, AWS Budgets, IoT services, GameLift, Braket (Quantum), RoboMaker, all Media Services, Lightsail, Elastic Beanstalk, SES, WorkSpaces, Device Farm, Amazon Forecast, Amazon Fraud Detector, DevOps Guru, Lookout services, and many more.

Full out-of-scope list: https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/aip-01-out-of-scope-services.html
