package com.laurastasiule.Product.objects;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue(value="Clothes")
public class Clothes extends Product {

}
