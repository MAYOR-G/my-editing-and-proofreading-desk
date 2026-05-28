-- Lightweight support RAG knowledge base using pgvector.

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS public.support_knowledge_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  content TEXT NOT NULL,
  content_hash TEXT NOT NULL UNIQUE,
  chunk_index INTEGER NOT NULL DEFAULT 0,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  embedding VECTOR(768) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS support_knowledge_chunks_embedding_idx
ON public.support_knowledge_chunks
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

CREATE INDEX IF NOT EXISTS support_knowledge_chunks_source_idx
ON public.support_knowledge_chunks (source);

ALTER TABLE public.support_knowledge_chunks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role manages support knowledge" ON public.support_knowledge_chunks;
CREATE POLICY "Service role manages support knowledge"
ON public.support_knowledge_chunks
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE OR REPLACE FUNCTION public.match_support_knowledge(
  query_embedding VECTOR(768),
  match_count INT DEFAULT 5,
  match_threshold FLOAT DEFAULT 0.72
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  source TEXT,
  content TEXT,
  chunk_index INTEGER,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE SQL
STABLE
AS $$
  SELECT
    support_knowledge_chunks.id,
    support_knowledge_chunks.title,
    support_knowledge_chunks.source,
    support_knowledge_chunks.content,
    support_knowledge_chunks.chunk_index,
    support_knowledge_chunks.metadata,
    1 - (support_knowledge_chunks.embedding <=> query_embedding) AS similarity
  FROM public.support_knowledge_chunks
  WHERE 1 - (support_knowledge_chunks.embedding <=> query_embedding) >= match_threshold
  ORDER BY support_knowledge_chunks.embedding <=> query_embedding
  LIMIT match_count;
$$;

CREATE OR REPLACE FUNCTION public.update_support_knowledge_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_support_knowledge_updated_at ON public.support_knowledge_chunks;
CREATE TRIGGER update_support_knowledge_updated_at
BEFORE UPDATE ON public.support_knowledge_chunks
FOR EACH ROW
EXECUTE FUNCTION public.update_support_knowledge_updated_at();
