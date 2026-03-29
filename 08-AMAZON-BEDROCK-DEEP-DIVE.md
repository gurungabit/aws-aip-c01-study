# Amazon Bedrock Deep Dive

> Bedrock is the #1 service on this exam. Know it thoroughly.

---

## What is Amazon Bedrock?

A fully managed service providing secure, enterprise-grade access to 100+ foundation models from multiple providers. It's the platform for building production-grade GenAI applications on AWS.

---

## Available Models (Key Providers)

| Provider | Models | Strengths |
|----------|--------|-----------|
| **Amazon** | Titan (Text, Embeddings, Image) | Native AWS, good embeddings |
| **Anthropic** | Claude (Opus, Sonnet, Haiku) | Best reasoning, long context |
| **Meta** | Llama | Open-weight, good general purpose |
| **Cohere** | Command, Embed | Enterprise search, embeddings |
| **Stability AI** | Stable Diffusion | Image generation |
| **AI21 Labs** | Jamba | Multilingual |
| **Mistral** | Mistral, Mixtral | Fast, efficient |

---

## Bedrock APIs

### 1. Invoke API (AWS SDK)
```python
import boto3, json
client = boto3.client('bedrock-runtime')
response = client.invoke_model(
    modelId='anthropic.claude-sonnet-4-6-v1',
    body=json.dumps({
        'anthropic_version': 'bedrock-2023-05-31',
        'messages': [{'role': 'user', 'content': 'Hello'}],
        'max_tokens': 1024
    })
)
```
- **Synchronous** request-response
- Model-specific request format

### 2. Converse API (AWS SDK)
```python
response = client.converse(
    modelId='anthropic.claude-sonnet-4-6-v1',
    messages=[{
        'role': 'user',
        'content': [{'text': 'Hello'}]
    }]
)
```
- **Unified format** across all models
- Built-in multi-turn conversation support
- Recommended for new applications

### 3. Streaming Variants
- `invoke_model_with_response_stream()` - streaming Invoke
- `converse_stream()` - streaming Converse
- Returns tokens as they're generated
- Essential for chat applications

### 4. OpenAI-Compatible APIs
- **Responses API** and **Chat Completions API**
- Drop-in replacement for OpenAI SDK
- Easier migration from OpenAI

---

## Bedrock Knowledge Bases (RAG)

### How It Works
1. **Connect data sources**: S3, Confluence, Salesforce, SharePoint, Web Crawler
2. **Auto-chunking**: Fixed, semantic, or hierarchical
3. **Auto-embedding**: Uses your chosen embedding model
4. **Auto-indexing**: Stores in managed or customer-managed vector store
5. **Query**: Retrieve API or RetrieveAndGenerate API

### Supported Vector Stores
| Store | Notes |
|-------|-------|
| Amazon OpenSearch Serverless | Default managed option |
| Amazon Aurora (pgvector) | SQL-compatible |
| Amazon Neptune Analytics | GraphRAG support |
| MongoDB Atlas | Third-party |
| Pinecone | Third-party |
| Redis Enterprise Cloud | Third-party |

### Key APIs
| API | Purpose |
|-----|---------|
| `Retrieve` | Get relevant chunks (you build the prompt) |
| `RetrieveAndGenerate` | End-to-end RAG (retrieval + FM response) |

### Advanced Features
- **Reranking models** - improve result relevance
- **Multimodal parsing** - tables, figures, charts
- **Source attribution** - citations in responses
- **GraphRAG** - Neptune Analytics for relationship-based retrieval

---

## Bedrock Guardrails

### 6 Safeguard Policies

#### 1. Content Moderation
- Filters: Hate, Insults, Sexual, Violence, Misconduct
- Works on text AND images
- Configurable thresholds (NONE, LOW, MEDIUM, HIGH)

#### 2. Prompt Attack Detection
- Detects prompt injection attempts
- Detects jailbreak attempts
- Blocks malicious prompts before they reach the FM

#### 3. Denied Topics
- Define topics the AI should refuse to discuss
- Custom topic definitions with examples

#### 4. PII Redaction
- Detect and mask PII in inputs and outputs
- Types: Name, Email, Phone, SSN, Credit Card, Address, etc.
- Actions: BLOCK or ANONYMIZE (mask with placeholder)

#### 5. Contextual Grounding
- Compares FM response against source documents
- Detects hallucinations
- Configurable grounding threshold

#### 6. Automated Reasoning
- Mathematical verification of logical claims
- 99% accuracy for supported reasoning types
- Formal logic-based verification

### ApplyGuardrail API
- Apply guardrails to ANY model (not just Bedrock models)
- Works with self-hosted models, OpenAI, Google, etc.
- Consistent safety layer across your entire AI stack

---

## Bedrock Agents

### What They Do
- Autonomous systems that reason, plan, and execute actions
- Break down user requests into steps
- Call APIs and tools to complete tasks
- Maintain conversation context

### Components
1. **FM** - The brain (reasoning engine)
2. **Instructions** - System prompt defining behavior
3. **Action Groups** - Lambda functions the agent can call
4. **Knowledge Bases** - Data the agent can search

### AgentCore
- Deploy and operate agents at scale
- Works with ANY framework (Strands, LangChain, etc.)
- No infrastructure management
- Built-in security and monitoring

---

## Bedrock Prompt Management

### Features
| Feature | Description |
|---------|------------|
| **Templates** | Parameterized, reusable prompts |
| **Versioning** | Track changes over time |
| **Variables** | Dynamic content insertion |
| **Approval workflows** | Governance for prompt changes |

---

## Bedrock Prompt Flows

### What They Do
- Visual workflow builder for multi-step FM tasks
- Drag-and-drop interface
- Connect prompts, conditions, and data sources

### Capabilities
- Sequential prompt chains
- Conditional branching
- Parallel execution
- Pre/post-processing steps
- Integration with Knowledge Bases

---

## Bedrock Model Evaluation

### Built-in Evaluation
- Compare multiple models on your data
- Automated quality metrics
- Human evaluation workflows
- Cost and latency comparisons

### Agent Evaluations
- Test agent task completion
- Evaluate tool usage patterns
- Measure reasoning quality

---

## Bedrock Pricing Models

| Model | Best For |
|-------|----------|
| **On-demand** | Variable, unpredictable traffic |
| **Provisioned Throughput** | Predictable high-volume workloads |
| **Batch Inference** | Non-real-time bulk processing |

### Cost Optimization Features
- **Prompt caching** - Reuse common prompt prefixes
- **Intelligent Prompt Routing** - Auto-route to cheapest capable model
- **Model Distillation** - Create smaller, cheaper custom models
- **Cross-Region Inference** - Use capacity in cheaper regions

---

## Bedrock Security

| Feature | Description |
|---------|------------|
| **Encryption** | In transit (TLS) and at rest (KMS) |
| **VPC endpoints** | Private connectivity, no internet |
| **IAM** | Fine-grained access control |
| **CloudTrail** | Full API audit logging |
| **Data privacy** | Your data is NOT used to train models |
| **Compliance** | ISO, SOC, GDPR, FedRAMP High, HIPAA |

---

## Key Exam Tips for Bedrock

1. **Converse API** is recommended over Invoke API for new apps (unified format)
2. **Knowledge Bases** = managed RAG (don't build your own unless you need to)
3. **Guardrails** work across ANY model via ApplyGuardrail API
4. **Cross-Region Inference** = resilience, NOT just cost optimization
5. **Provisioned Throughput** = guaranteed capacity, not just cost savings
6. **Prompt Flows** = no-code/low-code orchestration
7. Your data is NEVER used to train Bedrock models (important for security questions)
