# Practice Scenarios & Exam Tips for AIP-C01

> Think through these scenarios to build exam intuition.

---

## Scenario-Based Thinking

### Scenario 1: Building a RAG-Based Customer Support Bot

**Requirement**: Company wants an AI chatbot that answers questions using internal documentation stored in S3.

**Best Answer Pattern**:
- Amazon Bedrock Knowledge Bases (connects to S3, auto-chunks, auto-embeds)
- OpenSearch Serverless as vector store (managed, auto-scaling)
- Bedrock Guardrails for content safety + PII redaction
- CloudWatch for monitoring token usage and response quality
- DynamoDB for conversation history

**Why NOT build custom?** Bedrock Knowledge Bases handles the entire RAG pipeline. Only go custom if you need specific chunking logic or unsupported vector stores.

---

### Scenario 2: Multi-Model Architecture for Cost Optimization

**Requirement**: Reduce FM costs while maintaining quality for a high-traffic application.

**Best Answer Pattern**:
- **Model cascading**: Route simple queries to smaller/cheaper model (e.g., Haiku), complex to larger (e.g., Sonnet)
- **Intelligent Prompt Routing** in Bedrock
- **Semantic caching** for repeated similar queries
- **Prompt compression** to reduce token count
- **Prompt caching** for common prefixes

---

### Scenario 3: Enterprise Compliance for Financial Services

**Requirement**: Deploy GenAI in a regulated financial environment.

**Best Answer Pattern**:
- **VPC endpoints** for private Bedrock access (no internet)
- **Bedrock Guardrails** for PII redaction + content filtering
- **SageMaker Model Cards** for documentation/compliance
- **CloudTrail** for complete audit trail
- **AWS Glue** for data lineage tracking
- **Amazon Macie** to scan S3 for sensitive data
- **KMS** for encryption at rest
- **IAM** with least privilege

---

### Scenario 4: Building an AI Agent

**Requirement**: Create an autonomous agent that can search databases, call APIs, and process documents.

**Best Answer Pattern**:
- **Strands Agents** or **Bedrock Agents** for orchestration
- **MCP servers** on Lambda (lightweight tools) or ECS (complex tools)
- **Step Functions** for ReAct patterns with stopping conditions
- **IAM policies** for resource boundaries
- **Human-in-the-loop** via Step Functions for critical decisions
- **Bedrock AgentCore** for production deployment at scale

---

### Scenario 5: Cross-Region Resilience

**Requirement**: Ensure AI application stays available during regional outages.

**Best Answer Pattern**:
- **Bedrock Cross-Region Inference** (primary solution)
- **Step Functions circuit breaker** pattern
- **Graceful degradation** (fall back to simpler model or cached responses)
- **Route 53** health checks for failover

---

### Scenario 6: Detecting and Preventing Hallucinations

**Requirement**: Minimize hallucinations in a medical information system.

**Best Answer Pattern**:
- **Bedrock Knowledge Bases** to ground responses in verified medical docs
- **Guardrails Contextual Grounding** check (compare response vs source)
- **Automated Reasoning** checks for logical claims
- **Confidence scoring** via CloudWatch
- **Golden datasets** for regression testing
- **LLM-as-a-Judge** for automated quality evaluation
- **Low temperature** (0.0-0.2) for factual responses

---

### Scenario 7: Processing Multi-Modal Data

**Requirement**: Process documents containing text, images, tables, and audio.

**Best Answer Pattern**:
- **Amazon Transcribe** for audio -> text
- **Amazon Textract** for document text/table extraction
- **Bedrock multimodal models** (Claude, Titan) for image understanding
- **Bedrock Data Automation** for automated processing workflows
- **SageMaker Processing** for complex data transformations
- **Bedrock Knowledge Bases multimodal parsing** for tables/charts

---

### Scenario 8: Real-Time Chat Application

**Requirement**: Build a streaming chat interface with sub-second response.

**Best Answer Pattern**:
- **Bedrock Streaming APIs** (converse_stream)
- **API Gateway WebSocket** for bidirectional communication
- **Latency-optimized Bedrock models** (smaller, faster models)
- **Prompt caching** to reduce TTFT
- **CloudFront** for edge delivery
- **DynamoDB** for session/conversation state

---

### Scenario 9: Securing Against Prompt Injection

**Requirement**: Protect a public-facing AI chatbot from adversarial attacks.

**Best Answer Pattern**:
- **Bedrock Guardrails - Prompt Attack Detection** (primary defense)
- **Input sanitization** via Lambda pre-processing
- **Amazon Comprehend** for content classification
- **Defense-in-depth**: Pre-filter -> Guardrails -> FM -> Output Guardrails -> Post-filter
- **Automated adversarial testing** in CI/CD pipeline
- **CloudWatch** monitoring for attack pattern detection

---

### Scenario 10: Evaluating Model Performance

**Requirement**: Choose the best FM for a specific use case.

**Best Answer Pattern**:
- **Bedrock Model Evaluations** for automated assessment
- **A/B testing** with real traffic (canary deployment)
- **LLM-as-a-Judge** for scalable quality scoring
- **Human evaluation** for subjective quality
- **Cost-performance analysis** (token efficiency, latency, quality)
- **Golden datasets** for consistent benchmarking

---

## Exam Answer Strategy

### When the Question Asks "Most Cost-Effective"
- Think: smaller models, caching, model cascading, batch processing
- Bedrock on-demand for variable traffic
- Semantic caching to avoid redundant calls
- Prompt compression to reduce tokens

### When the Question Asks "Most Secure"
- Think: VPC endpoints, IAM least privilege, KMS encryption, Guardrails
- PrivateLink for private connectivity
- Macie for data scanning
- CloudTrail for audit

### When the Question Asks "Most Resilient/Available"
- Think: Cross-Region, circuit breakers, fallbacks, graceful degradation
- Bedrock Cross-Region Inference
- Step Functions circuit breaker
- Multiple model providers

### When the Question Asks "Least Operational Overhead"
- Think: Managed services (Bedrock KB, Guardrails, AgentCore)
- Bedrock Knowledge Bases over custom RAG
- Bedrock Agents over custom agent code
- Lambda over EC2
- Serverless everything

### When the Question Asks "Best Performance"
- Think: Streaming, caching, provisioned throughput, parallel processing
- Latency-optimized models
- Pre-computation for predictable queries
- Index optimization for vector search

---

## Common Exam Traps

1. **Don't confuse SageMaker training with Bedrock usage** - The exam is about USING FMs, not training from scratch
2. **Bedrock Knowledge Bases vs custom RAG** - KB is almost always the right answer unless the question specifies custom requirements
3. **Guardrails work on ANY model** - Not just Bedrock models (via ApplyGuardrail API)
4. **Cross-Region Inference is about resilience** - Not just cost
5. **Converse API > Invoke API** for new applications - Unified format across models
6. **Lambda for simple compute, ECS for complex** - Especially for MCP servers
7. **Fine-tuning is on SageMaker, not Bedrock** - Bedrock is for inference and prompt engineering
8. **Prompt Flows is no-code, Prompt Management is governance** - Different features

---

## Last-Minute Review Checklist

- [ ] Bedrock APIs: Invoke, Converse, Streaming, OpenAI-compatible
- [ ] Bedrock Knowledge Bases: Data sources, chunking, vector stores, APIs
- [ ] Bedrock Guardrails: All 6 policies, ApplyGuardrail API
- [ ] Bedrock Agents: Components, AgentCore, MCP
- [ ] RAG pipeline: Chunk -> Embed -> Store -> Retrieve -> Augment -> Generate
- [ ] Vector stores: OpenSearch, Aurora pgvector, Neptune, managed KB store
- [ ] Agent patterns: ReAct, plan-and-execute, multi-agent, human-in-loop
- [ ] Cost optimization: Cascading, caching, compression, right-sizing
- [ ] Security: VPC endpoints, IAM, KMS, Guardrails PII, Macie
- [ ] Monitoring: CloudWatch, X-Ray, Invocation Logs, Cost Anomaly Detection
- [ ] Evaluation: LLM-as-a-Judge, A/B testing, golden datasets, Bedrock evaluations
- [ ] Troubleshooting: Context overflow, embedding drift, prompt regression
- [ ] CI/CD: CodePipeline, CodeBuild, automated quality gates
- [ ] Resilience: Cross-Region Inference, circuit breakers, fallbacks
