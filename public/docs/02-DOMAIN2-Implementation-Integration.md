# Domain 2: Implementation & Integration (26%)

> Second heaviest domain. Focus on agents, deployment, and enterprise patterns.

---

## Task 2.1: Agentic AI Solutions & Tool Integrations

### Agent Frameworks on AWS

| Framework | Purpose |
|-----------|---------|
| **Strands Agents** | AWS-native agent orchestration framework |
| **AWS Agent Squad** | Multi-agent coordination systems |
| **Amazon Bedrock Agents** | Guided agent building in Bedrock console |
| **Amazon Bedrock AgentCore** | Deploy & operate agents at scale, any framework |

### Key Agent Concepts

#### Memory & State Management
- Agents need appropriate memory (short-term, long-term)
- State management across conversation turns
- DynamoDB for persistent state storage

#### Reasoning Patterns
| Pattern | Description | Service |
|---------|-------------|---------|
| **ReAct** | Reason + Act iteratively | Step Functions |
| **Chain-of-thought** | Step-by-step reasoning | Prompt engineering |
| **Plan-and-execute** | Plan first, then act | Step Functions + Lambda |

#### Model Context Protocol (MCP)
- **MCP servers**: Expose tools to agents
  - Lambda functions for **lightweight/stateless** MCP servers
  - Amazon ECS for **complex/stateful** MCP servers
- **MCP clients**: Agents consume tools via MCP client libraries
- Standardized function definitions for tool calling

### Safety & Control
- Step Functions **stopping conditions**
- Lambda **timeout mechanisms**
- IAM policies for **resource boundaries**
- **Circuit breakers** for failure mitigation
- **Human-in-the-loop**: Step Functions orchestrate review/approval processes

### Multi-Agent Coordination
- Specialized FMs for specific tasks
- Custom aggregation logic for model ensembles
- Model selection frameworks
- AWS Agent Squad for collaborative AI systems

### Tool Integration
- Strands API for custom tool behaviors
- Standardized function definitions
- Lambda for error handling & parameter validation
- Tool calling with structured input/output schemas

---

## Task 2.2: Model Deployment Strategies

### Deployment Options

| Approach | Service | Best For |
|----------|---------|----------|
| **On-demand** | Lambda + Bedrock | Variable traffic, cost-sensitive |
| **Provisioned throughput** | Bedrock provisioned | Predictable high traffic |
| **Custom endpoints** | SageMaker AI endpoints | Custom/fine-tuned models |
| **Hybrid** | SageMaker + Bedrock | Mixed workloads |

### LLM-Specific Deployment Challenges
- **Container-based** deployment patterns
- **Memory optimization** - LLMs are large
- **GPU utilization** optimization
- **Token processing capacity** planning
- **Specialized model loading** strategies (lazy loading, quantization)

### Cost-Performance Optimization
- Select **appropriate model size** for the task
- Use **smaller pre-trained models** for specific tasks (don't use GPT-4 class for classification)
- **API-based model cascading**: route simple queries to cheaper models
- Tiered approach: small model first, escalate to large model if needed

---

## Task 2.3: Enterprise Integration Architectures

### Integration Patterns

| Pattern | Service | Use Case |
|---------|---------|----------|
| **API-based** | API Gateway | Legacy system integration |
| **Event-driven** | EventBridge | Loose coupling, async workflows |
| **Microservices** | Lambda + API Gateway | Modular AI capabilities |
| **Webhooks** | Lambda | External system callbacks |

### Security for Enterprise Integration
- **Identity federation** between FM services and enterprise systems
- **RBAC** (Role-Based Access Control) for model and data access
- **Least privilege** API access to FMs
- Amazon Cognito for user authentication

### Cross-Environment Deployments
| Service | Purpose |
|---------|---------|
| AWS Outposts | On-premises data integration |
| AWS Wavelength | Edge deployments |
| Secure routing | Cloud <-> on-premises connectivity |

### CI/CD for GenAI
| Service | Role |
|---------|------|
| AWS CodePipeline | Orchestrate deployment pipeline |
| AWS CodeBuild | Build & test |
| Automated testing | FM-specific test suites |
| Security scans | Pre-deployment security checks |
| Rollback support | Automated rollback on failure |

---

## Task 2.4: FM API Integrations

### Bedrock API Types

| API | Pattern | Use Case |
|-----|---------|----------|
| **Invoke API** | Synchronous | Simple request-response |
| **Converse API** | Synchronous | Multi-turn conversations |
| **Streaming APIs** | Real-time | Chat interfaces, live output |
| **Responses API** | OpenAI-compatible | Migration from OpenAI |
| **Chat Completions API** | OpenAI-compatible | Drop-in replacement |

### Async Processing
- Amazon SQS for queuing requests
- Lambda for async invocation
- Step Functions for complex async workflows

### Real-Time Interactions
- **Streaming APIs** - incremental response delivery
- **WebSockets** - real-time text generation
- **Server-sent events (SSE)** - one-way streaming
- API Gateway with **chunked transfer encoding**

### Resilience
| Technique | Service |
|-----------|---------|
| Exponential backoff | AWS SDK built-in |
| Rate limiting | API Gateway |
| Fallback mechanisms | Custom logic |
| Distributed tracing | AWS X-Ray |

### Intelligent Model Routing
- **Static routing**: Application code configuration
- **Dynamic routing**: Step Functions content-based routing
- **Metric-based routing**: Route based on latency, cost, quality
- **Request transformation**: API Gateway for routing logic

---

## Task 2.5: Application Integration Patterns

### Developer Tools & Low-Code

| Service | Purpose |
|---------|---------|
| **AWS Amplify** | Declarative UI components for AI apps |
| **OpenAPI specs** | API-first development |
| **Bedrock Prompt Flows** | No-code workflow builder |
| **Amazon Q Developer** | AI code generation, refactoring, debugging |
| **Amazon Q Business** | Internal knowledge tools |

### Business System Integration
- Lambda for CRM enhancements
- Step Functions for document processing
- Amazon Bedrock Data Automation for automated workflows

### Advanced GenAI Application Patterns
- **Strands Agents** + **Agent Squad** for orchestration
- Step Functions for agent design patterns
- Bedrock for prompt chaining patterns
- Multi-step reasoning workflows

### Troubleshooting Tools
| Service | Capability |
|---------|------------|
| CloudWatch Logs Insights | Analyze prompts & responses |
| AWS X-Ray | Trace FM API calls end-to-end |
| Amazon Q Developer | GenAI-specific error pattern recognition |

---

## Key Takeaways for Domain 2

1. **Agents are a major topic**: Know Strands Agents, Agent Squad, Bedrock Agents, AgentCore
2. **MCP (Model Context Protocol)**: Know server types (Lambda vs ECS) and client patterns
3. **Bedrock APIs**: Know all 4 API types (Invoke, Converse, Streaming, OpenAI-compatible)
4. **Model routing**: Static, dynamic, metric-based approaches
5. **CI/CD**: CodePipeline + CodeBuild for GenAI deployment pipelines
6. **Enterprise patterns**: Event-driven (EventBridge), API-based (API Gateway), microservices
