package com.laurastasiule.Product;

public class TypesCount {

	private String type;
	private long count;

	public TypesCount() {
	}

	public TypesCount(String type, long count) {
		this.type = type;
		this.count = count;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public long getCount() {
		return count;
	}

	public void setCount(long count) {
		this.count = count;
	}

	@Override
	public String toString() {
		return "TypesCount [type=" + type + ", count=" + count + "]";
	}

	
}
