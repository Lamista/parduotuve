package it.akademija.Product.objects;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue(value="Toys")
public class Toys extends Product {

}
