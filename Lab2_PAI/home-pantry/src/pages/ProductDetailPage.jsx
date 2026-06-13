import { useParams, useNavigate } from 'react-router-dom';
import { Card, Badge, Button, Table, Alert } from 'react-bootstrap';
import { usePantry } from '../context/PantryContext';

function getExpiryStatus(expiry) {
  const diffDays = Math.ceil((new Date(expiry) - new Date()) / 86400000);
  if (diffDays < 0) return { variant: 'danger', text: `Przeterminowany ${Math.abs(diffDays)} dni temu` };
  if (diffDays <= 3) return { variant: 'warning', text: `Kończy się za ${diffDays} dni` };
  return { variant: 'success', text: `Ważny jeszcze ${diffDays} dni` };
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, removeProduct } = usePantry();

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <Alert variant="danger">
        Produkt o ID {id} nie istnieje.{' '}
        <Alert.Link onClick={() => navigate('/pantry')}>Wróć do spiżarni</Alert.Link>
      </Alert>
    );
  }

  const status = getExpiryStatus(product.expiry);

  const handleDelete = () => {
    removeProduct(product.id);
    navigate('/pantry');
  };

  return (
    <div>
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
        ← Powrót
      </Button>

      <Card className="shadow-sm">
        <Card.Header className="bg-success text-white">
          <h4 className="mb-0">{product.name}</h4>
        </Card.Header>
        <Card.Body>
          <Alert variant={status.variant}>{status.text}</Alert>
          <Table borderless>
            <tbody>
              <tr>
                <th>Kategoria</th>
                <td>{product.category}</td>
              </tr>
              <tr>
                <th>Ilość</th>
                <td>{product.amount} {product.unit}</td>
              </tr>
              <tr>
                <th>Data ważności</th>
                <td>{product.expiry}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>
                  <Badge bg={product.opened ? 'info' : 'secondary'}>
                    {product.opened ? 'Otwarty' : 'Zamknięty'}
                  </Badge>
                </td>
              </tr>
              {product.notes && (
                <tr>
                  <th>Uwagi</th>
                  <td>{product.notes}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          <Button variant="danger" onClick={handleDelete}>
            🗑️ Usuń produkt
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
