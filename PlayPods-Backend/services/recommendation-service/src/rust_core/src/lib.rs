use pyo3::prelude::*;
use numpy::{PyArray1, PyReadonlyArray1};

/// Calculate similarity between two vectors using cosine similarity
#[pyfunction]
fn cosine_similarity(a: PyReadonlyArray1<f64>, b: PyReadonlyArray1<f64>) -> f64 {
    let a = a.as_array();
    let b = b.as_array();
    
    let dot_product = a.iter().zip(b.iter()).map(|(x, y)| x * y).sum::<f64>();
    let norm_a = a.iter().map(|x| x * x).sum::<f64>().sqrt();
    let norm_b = b.iter().map(|x| x * x).sum::<f64>().sqrt();
    
    if norm_a == 0.0 || norm_b == 0.0 {
        0.0
    } else {
        dot_product / (norm_a * norm_b)
    }
}

#[pymodule]
fn recommendation_core(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(cosine_similarity, m)?)?;
    Ok(())
}
