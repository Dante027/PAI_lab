import { useMemo } from 'react';
import { Accordion, Badge, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { usePantry } from '../context/PantryContext';

export default function CategoriesPage() {
  const { products } = usePantry();
  const navigate = useNavigate();

  const grouped = useMemo(() => {
    return products.reduce((acc, p) => {
      const cat = p.category || 'Inne';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(p);
      return acc;
    }, {});
  }, [products]);

  const categories = Object.keys(grouped).sort();

  return (
    <div>
      <h2 className="mb-4">Kategorie produktów</h2>
      {categories.length === 0 ? (
        <p className="text-muted">Brak produktów w spiżarni.</p>
      ) : (
        <Accordion>
          {categories.map((cat, idx) => (
            <Accordion.Item key={cat} eventKey={String(idx)}>
              <Accordion.Header>
                {cat} <Badge bg="secondary" className="ms-2">{grouped[cat].length}</Badge>
              </Accordion.Header>
              <Accordion.Body className="p-0">
                <ListGroup variant="flush">
                  {grouped[cat].map(p => (
                    <ListGroup.Item
                      key={p.id}
                      action
                      onClick={() => navigate(`/product/${p.id}`)}
                      className="d-flex justify-content-between align-items-center"
                    >
                      {p.name}
                      <Badge bg="light" text="dark">{p.amount} {p.unit}</Badge>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </div>
  );
}
